interface Stats {
  id: string;
  name: string;
  value: string;
  unit: string;
}

interface StatsProps {
  stats: Stats[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              {/* Subtle accent border */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">
                  {stat.name}
                </dt>
                <dd className="flex items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm font-medium text-gray-500">
                      {stat.unit}
                    </span>
                  )}
                </dd>
              </div>
              
              {/* Subtle background pattern */}
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 opacity-60 group-hover:opacity-80 transition-opacity duration-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}