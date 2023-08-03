'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

type WwriteClientProps = {
  email?: string | null;
};

export default function WriteClient({ email }: WwriteClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('');

  if (!email) {
    signIn();
    return;
  }

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

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const file = files[0];

    const newImgSrc = URL.createObjectURL(file);

    setImgSrc(newImgSrc);
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
        <div>
          <input
            className="box-border p-[10px] block mb-[10px] border rounded-xl"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <img className="w-[256px]" src={imgSrc} />
        </div>
        <button className="bg-gray-300 p-[10px] rounded-lg" type="submit">
          버튼
        </button>
      </form>
    </div>
  );
}
