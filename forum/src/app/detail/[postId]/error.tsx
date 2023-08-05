'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

/**
 * ! 반드시 client component 로 만들어야됨
 *
 * * 파라미터로 error, reset 이 넘어옴
 *
 * * reset() 은 현재 페이지 다시 로드
 *
 * * 해당 page 부분만 error 처리 가능
 *
 * * 해당 deps 에 error 가 없는 경우 상위 deps 찾아서 보여줌
 * * loading 도 동일
 *
 * ! layout 에서 나는 error 는 못잡음
 * - global-error 만들어야함
 *
 * @param param0
 * @returns
 */
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h4>에러남 </h4>
    </div>
  );
}
