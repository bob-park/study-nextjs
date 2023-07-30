'use client';

import { MouseEvent } from 'react';

type ListItemProps = {
  title: string;
  content?: string;
  onEdit?: () => void;
};

function List() {}

function ListItem(props: ListItemProps & React.HTMLAttributes<HTMLDivElement>) {
  const { onEdit } = props;

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onEdit && onEdit();
  };

  return (
    <div
      className="bg-white rounded-md p-[10px] mb-[5px] shadow-sm shadow-white"
      {...{ onClick: props.onClick }}
    >
      <h4 className="text-xl font-extrabold">{props.title}</h4>
      <p className="text-gray-400 my-[5px]">{props.content}</p>
      {onEdit && (
        <button
          className="p-[10px] bg-gray-300 rounded-lg"
          onClick={handleEdit}
        >
          EDIT
        </button>
      )}
    </div>
  );
}

export { ListItem };
export default List;
