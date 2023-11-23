'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  subtitle = 'Try adjusting your search or filters.',
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        justify-center
        items-center
        text-center
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Reset filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
