import Time from "./toolbar/Time"

function Toolbar() {
  return (
    <div className="w-full h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="relative">
          {/* Search or other left-side content can go here */}
        </div>
      </div>
      <div className="flex items-center">
        <Time />
      </div>
    </div>
  )
}

export default Toolbar