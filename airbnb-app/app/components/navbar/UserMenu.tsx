'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '@/app/components/Avatar';
import React, { useCallback, useState } from 'react';
import MenuItem from '@/app/components/navbar/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            md:block
            text-sm
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            felx-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} lable="My Trips" />
                <MenuItem onClick={() => {}} lable="My Favorites" />
                <MenuItem onClick={() => {}} lable="My Reservations" />
                <MenuItem onClick={() => {}} lable="My Properties" />
                <MenuItem onClick={() => {}} lable="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  lable="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} lable="Login" />
                <MenuItem onClick={registerModal.onOpen} lable="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
