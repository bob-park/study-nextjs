'use client';

import { signOut } from 'next-auth/react';

type LogoutBtnProps = {
  username?: string | null;
};

export default function LogoutBtn({ username }: LogoutBtnProps) {
  return (
    <div className="inline-block ml-[50px]">
      <span className="font-extrabold">{username}</span>
      <button
        className="bg-gray-300 p-2 rounded-lg ml-[20px]"
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    </div>
  );
}
