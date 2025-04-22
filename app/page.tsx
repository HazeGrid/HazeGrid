export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">29°</h1>
        <p className="text-lg mt-2">Feels Like 29°</p>
        <p className="text-sm opacity-75">Feels warmer than the actual temperature.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-white bg-opacity-10 rounded-xl">
            <p className="text-xl">46%</p>
            <p className="opacity-75">Moderate humidity.</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 rounded-xl">
            <p className="text-xl">10 km</p>
            <p className="opacity-75">It's perfectly clear right now.</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 rounded-xl">
            <p className="text-xl">Clear</p>
            <p className="opacity-75">Clear sky</p>
          </div>
        </div>
      </div>
    </main>
  );
}
