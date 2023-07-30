type ListItemProps = {
  title: string;
  content?: string;
};

function List() {}

function ListItem({ title, content }: ListItemProps) {
  return (
    <div className="bg-white rounded-md p-[10px] mb-[5px] shadow-sm shadow-white">
      <h4 className="text-xl font-extrabold">{title}</h4>
      <p className="text-gray-400 my-[5px]">{content}</p>
    </div>
  );
}

export { ListItem };
export default List;
