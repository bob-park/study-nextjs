'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // handle
  // handle
  const handleWrite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    await fetch('/api/signup', {
      method: 'post',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          alert(res.statusText);
          return;
        }

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
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="box-border p-[10px] block mb-[10px] border"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="box-border p-[10px] block mb-[10px] border"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-gray-300 p-2 rounded-lg" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
