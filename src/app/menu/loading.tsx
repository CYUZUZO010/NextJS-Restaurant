export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
