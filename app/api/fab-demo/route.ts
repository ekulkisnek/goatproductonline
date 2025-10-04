import { NextResponse } from 'next/server'

type TimePoint = {
  t: string
  yield: number
  defectsPerCm2: number
  oee: number
  wipLots: number
  euvWph: number
  cycleTimeDays: number
}

function generateSeries(days: number): TimePoint[] {
  const series: TimePoint[] = []
  const now = Date.now()
  for (let i = days - 1; i >= 0; i--) {
    const ts = new Date(now - i * 24 * 60 * 60 * 1000)
    series.push({
      t: ts.toISOString().slice(0, 10),
      yield: Math.max(80, Math.min(99.5, 94 + (Math.random() - 0.5) * 4)),
      defectsPerCm2: Math.max(0.01, 0.15 + (Math.random() - 0.5) * 0.08),
      oee: Math.max(60, Math.min(92, 85 + (Math.random() - 0.5) * 8)),
      wipLots: Math.max(50, Math.round(120 + (Math.random() - 0.5) * 30)),
      euvWph: Math.max(80, Math.round(155 + (Math.random() - 0.5) * 20)),
      cycleTimeDays: Math.max(20, Math.round(38 + (Math.random() - 0.5) * 6)),
    })
  }
  return series
}

function generateWaferMap(size = 25) {
  // 25x25 grid wafer map with clustered fails
  const map: number[][] = []
  const hotSpots = [
    { x: 7, y: 8 },
    { x: 17, y: 14 },
  ]
  for (let y = 0; y < size; y++) {
    const row: number[] = []
    for (let x = 0; x < size; x++) {
      const centerDist = Math.hypot(x - size / 2, y - size / 2)
      const inCircle = centerDist <= size / 2
      if (!inCircle) {
        row.push(-1) // out of wafer
        continue
      }
      let pFail = 0.02
      for (const h of hotSpots) {
        const d = Math.hypot(x - h.x, y - h.y)
        pFail += Math.max(0, 0.12 - d * 0.02)
      }
      row.push(Math.random() < pFail ? 0 : 1)
    }
    map.push(row)
  }
  return map
}

export async function GET() {
  const history = generateSeries(30)
  const latest = history[history.length - 1]

  // SPC-style control limits for yield
  const mean = history.reduce((a, b) => a + b.yield, 0) / history.length
  const variance = history.reduce((a, b) => a + Math.pow(b.yield - mean, 2), 0) / history.length
  const sigma = Math.sqrt(variance)
  const spc = {
    metric: 'yield',
    mean,
    ucl: mean + 3 * sigma,
    lcl: mean - 3 * sigma,
  }

  const diePerWafer = (waferDiameterMm: number, dieAreaMm2: number) => {
    const r = waferDiameterMm / 2
    const waferArea = Math.PI * r * r
    const edgeLossFactor = waferDiameterMm / Math.sqrt(2 * dieAreaMm2)
    return Math.max(1, Math.floor(waferArea / dieAreaMm2 - edgeLossFactor))
  }

  const calc = {
    diePerWafer200mm: diePerWafer(200, 50),
    diePerWafer300mm: diePerWafer(300, 50),
  }

  const payload = {
    message: 'Semiconductor fab demo metrics',
    timestamp: new Date().toISOString(),
    latest,
    history,
    spc,
    waferMap: generateWaferMap(),
    kpis: {
      yieldPct: latest.yield,
      defectDensityPerCm2: latest.defectsPerCm2,
      oeePct: latest.oee,
      euvThroughputWph: latest.euvWph,
      cycleTimeDays: latest.cycleTimeDays,
      wipLots: latest.wipLots,
    },
    calculators: calc,
    notes: [
      'Data is synthetic for demo purposes',
      'Wafer map includes hotspot clusters to mimic systematic defects',
      'SPC uses 3-sigma limits on daily yield',
    ],
  }

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}


