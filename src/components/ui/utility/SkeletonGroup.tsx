import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  count: number;
  maxWidth?: number;
};

export const SkeletonGroup = ({ count, maxWidth = 300 }: Props) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        className="bg-primary/20 h-[15px] rounded-full"
        style={{ width: `${maxWidth + (count - index - 1) * 50}px` }}
      />
    ))}
  </div>
);
