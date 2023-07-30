type CartButton = {
  color?: 'red' | 'blue';
};

export default function CartButton({ color = 'red' }: CartButton) {
  return <button className={`w-10 h-5 bg-${color}-500`}>버튼</button>;
}
