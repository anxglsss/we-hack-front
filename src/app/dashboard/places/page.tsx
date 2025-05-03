'use client'

import blueHall from '@/assets/blue.jpg'
import meetingRoom from '@/assets/meeting.jpeg'
import openSpace from '@/assets/open.jpeg'
import redHall from '@/assets/red.jpg'
import wifiZone from '@/assets/wifi.jpeg'
import Image from 'next/image'

const places = [
  {
    id: 1,
    name: 'Red Hall',
    description: 'Spacious area for lectures and large meetings.',
    image: redHall,
  },
  {
    id: 2,
    name: 'Blue Hall',
    description: 'Comfortable room for focused group work.',
    image: blueHall,
  },
  {
    id: 3,
    name: 'Wi-Fi Zone',
    description: 'Relax and browse with high-speed internet.',
    image: wifiZone,
  },
  {
    id: 4,
    name: 'Open Space',
    description: 'Flexible shared workspace with natural light.',
    image: openSpace,
  },
  {
    id: 5,
    name: 'Meeting Room',
    description: 'Private room for team meetings and calls.',
    image: meetingRoom,
  },
]


export default function PlacesPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">Discover Amazing Places</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="relative bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
              <Image
                src={place.image}
                alt={place.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <p className="text-sm">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
