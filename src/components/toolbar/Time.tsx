import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react';
function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-lg flex gap-4">
      <span className="text-gray-300"> <Clock size={20} className="text-amber-500 inline" /> {time}</span>
    </div>
  )
}

export default Time