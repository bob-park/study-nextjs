import CartItem from '@/components/CartItem';

import { age } from './data';
import Hello from '@/components/Hello';

/**
 *
 * * component 는 재사용이 잦은 UI 를 component 로 만든다.
 *
 * 1. 더러운 코드 축약
 * 2. 같은 코드 재사용
 *
 * * nextjs 는 컴포넌트 2개
 *
 * server component
 * - 그냥 nextjs 에서 component 만들면 server compoent
 * - html 에 (return(..)) 에 js 기능 넣기 불가능
 * - html 를 동적으로 바꿀수 없음 (useEffect 머 이런거) => 진짜 안되네
 * - 로딩 속도가 빠름
 * - 검색엔진 노출 가능
 * - 큰 페이지는 server component 로 만드는 걸 추천
 *
 * client component
 * - 맨위에 'use client' 추가하면 client component
 * - html 에 (return(..)) 에 js 기능 넣기 가능
 * - html 동적으로 바꿀 수 있음 (useEffect, 머 이런거)
 * - 로딩 속도 느림
 * - 검색엔진 노출이 힘듬
 * - hydration 필요 (client 에 js 보내주고 분석하는 작업)
 * - js 기능만 필요한 곳
 *
 */
export default function Cart() {
  let carts = ['Tomatoes', 'Pasta'];

  return (
    <>
      <Hello />
      <div>
        <h4 className="font-bold text-center mt-10">Cart {age}</h4>
        {carts.map((cart) => (
          <CartItem key={cart} name={cart} price={40} count={1} />
        ))}
      </div>
    </>
  );
}
