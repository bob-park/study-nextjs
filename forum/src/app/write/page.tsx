'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Write() {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // handle
  const handleWrite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/write', {
      method: 'post',
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => {
        router.push('/list');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-[20px]">
      <h4 className="font-extrabold text-3xl mb-[20px]">글작성</h4>
      <form
        // className="grid grid-col-1 gap-5"
        action="/api/write"
        onSubmit={handleWrite}
      >
        <div>
          <input
            className="box-border p-[10px] block mb-[10px] border rounded-xl"
            type="text"
            value={title}
            placeholder="글 제목"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            className="box-border p-[10px] block mb-[10px] border rounded-xl"
            type="text"
            value={content}
            placeholder="글 내용"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="bg-gray-300 p-[10px] rounded-lg" type="submit">
          버튼
        </button>
      </form>
    </div>
  );
}
