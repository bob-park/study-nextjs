'use client';

import { FormEvent, useEffect, useState } from 'react';

import { format } from 'timeago.js';

type CommentItem = {
  id: string;
  author: string;
  comment: string;
  createAt: Date;
};

type CommentProps = {
  currentEmail?: string | null;
  postId: string;
};

export default function Comment({ currentEmail, postId }: CommentProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [comment, setComment] = useState<string>('');

  // useEffect
  useEffect(() => {
    async function handleGetComments() {
      await fetch(`/api/post/${postId}/comment`)
        .then((res) => res.json())
        .then((result) => {
          setComments(
            result.map((item: any) => ({
              id: item._id.toString(),
              author: item.author === currentEmail ? 'Me' : item.author,
              comment: item.comment,
              createAt: item.createAt,
            })),
          );
        });
    }

    handleGetComments();
  }, [postId, currentEmail]);

  // handle

  const handleWriteComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/post/${postId}/comment`, {
      method: 'post',
      body: JSON.stringify({
        comment,
      }),
    }).then((res) => {
      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      setComments((prev) => {
        const newComments = prev.slice();

        newComments.unshift({
          id: new Date().getTime().toString(),
          author: 'Me',
          comment,
          createAt: new Date(),
        });

        return newComments;
      });
      setComment('');
    });
  };

  return (
    <div>
      <div className="my-[50px]">
        <form className="flex" onSubmit={handleWriteComment}>
          <input
            className="flex-1 box-border p-[10px] block mb-[10px] border"
            placeholder="댓글"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="bg-gray-300 px-2 rounded-lg ml-[20px]"
            type="submit"
          >
            댓글 작성
          </button>
        </form>
      </div>
      <div>댓글 목록</div>
      <div className="grid grid-cols-1 gap-2">
        {comments.map((item) => (
          <div
            key={`comment_${item.id}`}
            className="m-1 p-3 bg-gray-200 rounded-xl shadow-2xl"
          >
            <div className="flex justify-between">
              <h4 className="font-bold">{item.author}</h4>
              <span className="text-sm text-gray-500">
                {format(item.createAt, 'ko_KR')}
              </span>
            </div>
            <p className="ml-[10px] text-gray-400">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
