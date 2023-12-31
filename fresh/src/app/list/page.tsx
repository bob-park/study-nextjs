'use client';

// nextjs 는 pages dir 하위 dir 이 URL 이 됨
import Item from '@/components/Item';
import { useState } from 'react';

// 반드시 `export default` 를 붙여야함
export default function List() {
  let items = ['Tomatoes', 'Pasta', 'Coconut'];

  const [itemCounts, setItemCounts] = useState<number[]>([0, 0, 0]);

  return (
    <div>
      <h4 className="font-bold text-center mt-10">상품목록</h4>
      {/* <div className="mx-[20px] my-auto w-[200px] bg-white text-black p-[20px] rounded-[5px] mt-2">
        <h4>상품1 $40</h4>
      </div>
      <div className="mx-[20px] my-auto w-[200px] bg-white text-black p-[20px] rounded-[5px] mt-2">
        <h4>상품2 $40</h4>
      </div> */}
      {items.map((item, index) => (
        <Item
          key={item}
          imgSrc={`/food${index}.png`}
          name={item}
          price={40}
          count={itemCounts[index]}
          onPlus={() =>
            setItemCounts((prev) => {
              const newCounts = [...prev];

              newCounts[index] = prev[index] + 1;

              return newCounts;
            })
          }
          onMinus={() =>
            setItemCounts((prev) => {
              const newCounts = [...prev];

              newCounts[index] = prev[index] <= 0 ? 0 : prev[index] - 1;

              return newCounts;
            })
          }
        />
      ))}
    </div>
  );
}
