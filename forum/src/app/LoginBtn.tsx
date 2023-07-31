'use client';

import { signIn } from 'next-auth/react';

export default function LoginBtn() {
  return (
    <button
      className="bg-gray-300 p-2 rounded-lg ml-[20px]"
      onClick={() => signIn()}
    >
      로그인
    </button>
  );
}
