'use client';

import { FormEvent, useLayoutEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

type EditDetailProps = {
  id: string;
  title: string;
  content?: string;
};

export default function EditDetail(props: EditDetailProps) {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('');

  useLayoutEffect(() => {
    setTitle(props.title);
    setContent(props.content);
  }, [props]);

  // handle
  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/edit/${props.id}`, {
      method: 'put',
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
    <form
      // className="grid grid-col-1 gap-5"
      action="/api/write"
      onSubmit={handleEdit}
    >
      <div>
        <input
          className="box-border p-[10px] block mb-[10px] border rounded-xl"
          type="text"
          defaultValue={title}
          placeholder="글 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          className="box-border p-[10px] block mb-[10px] border rounded-xl"
          type="text"
          defaultValue={content}
          placeholder="글 내용"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="bg-gray-300 p-[10px] rounded-lg" type="submit">
        수정
      </button>
    </form>
  );
}
