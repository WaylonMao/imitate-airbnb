import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import useLoginModal from '@/app/hooks/useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => {
            return axios.delete(`/api/favorites/${listingId}`);
          };
        } else {
          request = () => {
            return axios.post(`/api/favorites/${listingId}`);
          };
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
