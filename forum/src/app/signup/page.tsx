'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // handle
  // handle
  const handleWrite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/signup', {
      method: 'post',
      body: JSON.stringify({
        userId,
        password,
      }),
    })
      .then((res) => {
        router.push('/list');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-[20px]">
      <h4 className="font-extrabold text-3xl mb-[20px]">회원가입</h4>
      <form className="grid grid-col-1 gap-5" onSubmit={handleWrite}>
        <input
          className="box-border p-[10px] block mb-[10px] border"
          value={userId}
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          className="box-border p-[10px] block mb-[10px] border"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
