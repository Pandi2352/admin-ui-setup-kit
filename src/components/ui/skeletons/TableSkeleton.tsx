import { Skeleton } from "../Skeleton";

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
         <Skeleton className="h-8 w-1/4" />
         <div className="flex-1" />
         <Skeleton className="h-8 w-24" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-2">
           <Skeleton className="h-12 w-12 rounded-full" />
           <div className="space-y-2 flex-1">
             <Skeleton className="h-4 w-1/3" />
             <Skeleton className="h-3 w-1/4" />
           </div>
           <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
};
