import CartButton from './CartButton';

type CartItemProps = {
  name: string;
  price: number;
  count: number;
};

export default function CartItem({ name, price, count }: CartItemProps) {
  return (
    <div className="flex justify-around border-b border-solid border-gray-400 b p-[20px] leading-[1px]">
      <p>{name}</p>
      <p>${price}</p>
      <p>{count}개</p>
      <p>
        <CartButton color="blue" />
      </p>
    </div>
  );
}
