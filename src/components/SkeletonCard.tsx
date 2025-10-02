import React from 'react';
import { Card } from '@/components/ui/card';

/**
 * Skeleton loader for cards - provides visual feedback while content loads
 */
const SkeletonCard: React.FC = () => {
  return (
    <Card className="p-6 space-y-4">
      <div className="skeleton h-6 w-3/4 rounded"></div>
      <div className="skeleton h-4 w-full rounded"></div>
      <div className="skeleton h-4 w-5/6 rounded"></div>
      <div className="flex gap-2 mt-4">
        <div className="skeleton h-10 w-24 rounded-lg"></div>
        <div className="skeleton h-10 w-24 rounded-lg"></div>
      </div>
    </Card>
  );
};

export default SkeletonCard;
