type StatCardProps = {
  title: string;
  value: string;
  color?: string;
  accentColor?: string;
};

export function StatCard({
  title,
  value,
  color,
  accentColor = '#7dd3fc',
}: StatCardProps) {
  return (
    <div
      className="relative box-border flex h-full min-h-30 w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:shadow-md"
      style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}
    >
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="text-base font-medium text-gray-600">{title}</div>
        <div className={`text-3xl font-semibold ${color ?? 'text-gray-900'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
