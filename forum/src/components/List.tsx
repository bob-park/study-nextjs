import { ReactElement, ReactHTMLElement, ReactNode } from 'react';

type ListItemProps = {
  title: string;
  content?: string;
};

function List() {}

function ListItem(props: ListItemProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="bg-white rounded-md p-[10px] mb-[5px] shadow-sm shadow-white"
      {...props}
    >
      <h4 className="text-xl font-extrabold">{props.title}</h4>
      <p className="text-gray-400 my-[5px]">{props.content}</p>
    </div>
  );
}

export { ListItem };
export default List;
