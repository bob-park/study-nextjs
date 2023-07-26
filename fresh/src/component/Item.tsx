type ItemProps = {
  name: string;
  price: number;
};

export default function Item({ name, price }: ItemProps) {
  return (
    <div className="mx-[20px] my-auto w-[200px] bg-white text-black p-[20px] rounded-[5px] mt-2">
      <h4>
        {name} ${price}
      </h4>
    </div>
  );
}
