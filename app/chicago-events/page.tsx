'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

type ChicagoEvent = {
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

const MapContainer = dynamic(async () => (await import('react-leaflet')).MapContainer, { ssr: false })
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false })
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false })
const Popup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false })

export default function ChicagoEventsPage() {
  const [events, setEvents] = useState<ChicagoEvent[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.events as ChicagoEvent[]))
      .catch(() => setEvents([]))
  }, [])

  const center = useMemo(() => ({ lat: 41.8781, lng: -87.6298 }), [])

  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = search.trim().length === 0 ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.venueName ?? '').toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !category || e.category === category
      return matchesSearch && matchesCategory
    })
  }, [events, search, category])

  const categories = useMemo(() => {
    const set = new Set<string>()
    events.forEach(e => { if (e.category) set.add(e.category) })
    return Array.from(set).sort()
  }, [events])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Chicago Events Map</h1>
            <p className="text-gray-600 dark:text-gray-300">Interactive map of events around Chicago.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 w-full sm:w-80"
              placeholder="Search events or venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-0 overflow-hidden">
            <MapContainer center={center} zoom={12} scrollWheelZoom className="leaflet-container">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {filtered.map(ev => (
                <Marker key={ev.id} position={[ev.latitude, ev.longitude]}>
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-semibold">{ev.title}</div>
                      {ev.venueName && <div className="text-sm text-gray-600 dark:text-gray-300">{ev.venueName}</div>}
                      {ev.category && <div className="text-xs text-blue-600">{ev.category}</div>}
                      {ev.url && <a href={ev.url} target="_blank" className="text-blue-600 underline text-sm">Details</a>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="card max-h-[500px] overflow-auto divide-y divide-gray-200 dark:divide-gray-800">
            {filtered.map(ev => (
              <div key={ev.id} className="p-4">
                <div className="font-semibold">{ev.title}</div>
                {ev.venueName && <div className="text-sm text-gray-600 dark:text-gray-300">{ev.venueName}</div>}
                <div className="text-xs text-gray-500">{ev.latitude.toFixed(4)}, {ev.longitude.toFixed(4)}</div>
                {ev.category && <div className="text-xs text-blue-600 mt-1">{ev.category}</div>}
                {ev.url && <a href={ev.url} target="_blank" className="text-blue-600 underline text-sm">Open</a>}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-gray-500">No events found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
