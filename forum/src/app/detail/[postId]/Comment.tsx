'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

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

timeago.register('ko', ko);

export default function Comment({ currentEmail, postId }: CommentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [comment, setComment] = useState<string>('');

  // useEffect
  useEffect(() => {
    async function handleGetComments() {
      setLoading(true);

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

          setLoading(false);
        });
    }

    handleGetComments();
  }, [postId, currentEmail]);

  // handle

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/post/${postId}/comment`, {
      method: 'post',
      body: JSON.stringify({
        comment,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          alert(res.statusText);
          return;
        }

        return res.json();
      })
      .then((result) => {
        setComments((prev) => {
          const newComments = prev.slice();

          newComments.unshift({
            id: result._id.toString(),
            author: result.author === currentEmail ? 'Me' : result.author,
            comment: result.comment,
            createAt: result.createAt,
          });

          return newComments;
        });
        setComment('');
      });
  };

  return (
    <div>
      <div className="my-[50px]">
        <form className="flex" onSubmit={handleAddComment}>
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
        {!loading ? (
          comments.map((item) => (
            <div
              key={`comment_${item.id}`}
              className="m-1 p-3 bg-gray-200 rounded-xl shadow-2xl"
            >
              <div className="flex justify-between">
                <h4 className="font-bold">{item.author}</h4>
                <span className="text-sm text-gray-500">
                  <TimeAgo datetime={item.createAt} locale="ko" />
                </span>
              </div>
              <p className="ml-[10px] text-gray-400">{item.comment}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center text-xl font-bold mt-10 w-full h-[50px]">
            <div>
              <AiOutlineLoading className="animate-spin w-10 h-10 mr-5 inline" />
              <span>로딩중</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
