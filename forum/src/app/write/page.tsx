'use client';

import { FormEvent, useState } from 'react';

export default function Write() {
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
      .then((res) => res.body)
      .catch((err) => console.error(err));
  };

  return (
    <div className="">
      <h4>글작성</h4>
      <form
        className="grid grid-col-1 gap-5"
        action="/api/write"
        onSubmit={handleWrite}
      >
        <div>
          <label className="pr-10" htmlFor="title">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="pr-10" htmlFor="content">
            content
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
