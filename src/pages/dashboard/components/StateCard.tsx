type StateCardProps = {
  state: string;
  total: string;
  vets: string;
  techs: string;
};

export function StateCard({ state, total, vets, techs }: StateCardProps) {
  return (
    <div className="box-border flex h-full min-h-25 w-full min-w-0 flex-col justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">{state}</span>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Veterinarians:</span>
          <span className="font-semibold text-gray-900">{vets}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vet Techs:</span>
          <span className="font-semibold text-gray-900">{techs}</span>
        </div>
      </div>
    </div>
  );
}
