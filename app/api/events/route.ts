export type ChicagoEvent = {
  id: string
  title: string
  venueName?: string
  latitude: number
  longitude: number
  startTimeIso?: string
  endTimeIso?: string
  url?: string
  category?: string
}

// Sample dataset; replace with a real data source later
const sampleEvents: ChicagoEvent[] = [
  {
    id: '1',
    title: 'Millennium Park Concert',
    venueName: 'Jay Pritzker Pavilion',
    latitude: 41.882552,
    longitude: -87.622551,
    startTimeIso: new Date().toISOString(),
    url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_events.html',
    category: 'Music',
  },
  {
    id: '2',
    title: 'Art Institute Exhibition',
    venueName: 'Art Institute of Chicago',
    latitude: 41.879584,
    longitude: -87.623713,
    url: 'https://www.artic.edu/',
    category: 'Art',
  },
  {
    id: '3',
    title: 'Bears Game Day',
    venueName: 'Soldier Field',
    latitude: 41.8623,
    longitude: -87.6167,
    url: 'https://www.chicagobears.com/',
    category: 'Sports',
  },
  {
    id: '4',
    title: 'Navy Pier Fireworks',
    venueName: 'Navy Pier',
    latitude: 41.8917,
    longitude: -87.6078,
    url: 'https://navypier.org/',
    category: 'Attractions',
  },
  {
    id: '5',
    title: 'West Loop Food Fest',
    venueName: 'Fulton Market District',
    latitude: 41.8853,
    longitude: -87.6480,
    category: 'Food',
  },
]

export async function GET() {
  return Response.json({ events: sampleEvents })
}
