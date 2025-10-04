'use client'

import Link from 'next/link'

export default function Fabrication() {
  const highlights = [
    { title: 'Yield', value: '94–98%', desc: 'SPC-controlled, 3σ limits with automated alarms' },
    { title: 'Defect Density', value: '0.1–0.2 / cm²', desc: 'Inline inspection + Pareto classification' },
    { title: 'EUV Throughput', value: '150–170 WPH', desc: 'NXE/EXE class scanners with dose control' },
    { title: 'OEE', value: '80–90%', desc: 'Equipment availability, performance, quality' },
    { title: 'Cycle Time', value: '32–40 days', desc: 'Start-to-ship for advanced logic nodes' },
    { title: 'WIP Lots', value: '100–150', desc: 'Dynamic lot scheduling across toolsets' },
  ]

  const links = [
    { href: '/api/fab-demo', label: 'API: Live SPC-style metrics' },
    { href: '/api/serverless-demo', label: 'API: Serverless function' },
    { href: '/api/edge-demo', label: 'API: Edge function' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Semiconductor Fabrication</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fab-centric view layered on top of the Vercel Free Tier Demo. Explore synthetic SPC data, wafer map patterns,
            and fab KPIs delivered via serverless APIs and edge functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {highlights.map((h, i) => (
            <div key={i} className="card">
              <div className="text-sm text-gray-500 dark:text-gray-400">{h.title}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{h.value}</div>
              <div className="text-gray-600 dark:text-gray-300 mt-1">{h.desc}</div>
            </div>
          ))}
        </div>

        <div className="card mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">SPC + Wafer Map Demo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The endpoint below returns a 30-day series of fab KPIs and a synthetic wafer map with clustered fails.
            Use it to prototype fab dashboards, anomaly detection, or advanced scheduling policies.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
{`GET /api/fab-demo
{
  kpis: { yieldPct, defectDensityPerCm2, oeePct, euvThroughputWph, cycleTimeDays, wipLots },
  spc: { mean, ucl, lcl },
  waferMap: number[25][25],
  history: Array<TimePoint>
}`}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="btn-primary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ideas Relevant to Fab Engineers</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Use edge functions for sub-100ms SPC alarms across global sites.</li>
            <li>Stream wafer maps via signed Blob URLs for vendor collaboration.</li>
            <li>Leverage KV for hot in-line counters (lot arrivals, queue lengths).</li>
            <li>Backfill and aggregates via Postgres for Pareto and MTBF analytics.</li>
            <li>Automate lot release flow with serverless hooks and middleware guards.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


