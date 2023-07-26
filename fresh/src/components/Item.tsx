import Image from 'next/image';

// img
import TomatoImg from '/public/food0.png';

type ItemProps = {
  imgSrc?: string;
  name: string;
  price: number;
};

//
/**
 * * nextjs 에서 Image 사용할 경우 자동으로 최적화 진행
 * +lazy loading
 * +사이즈 최적화
 * +layout shift 방지
 *
 * ! 단점 - 외부 이미지 경로 넣기가 힘듬(하지만, 넣을 수 있지만, width, height 를 추가로 넣어야함) + next.config.js 에 셋팅이 필요함
 *
 * */
export default function Item({ imgSrc, name, price }: ItemProps) {
  return (
    <div className="mx-[20px] my-auto w-[200px] bg-white text-black p-[20px] rounded-[5px] mt-2">
      {imgSrc && <img className="w-full h-auto" src={imgSrc} />}

      {/* {imgSrc && <Image className="w-full h-auto" src={TomatoImg} />} */}
      {/* {imgSrc && (
        <Image
          className="w-full h-auto"
          src={imgSrc}
          width={400}
          height={300}
        />
      )} */}
      <h4>
        {name} ${price}
      </h4>
    </div>
  );
}
