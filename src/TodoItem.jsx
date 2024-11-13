/* eslint-disable react/prop-types */
export default function TodoItem({
  item,
  index,
  editTodo,
  deleteTodo,
  toggleTodo,
}) {
  return (
    <div className="w-full h-auto flex flex-row justify-between items-center text-white bg-slate-500 bg-opacity-40  p-4 rounded-md mt-3">
      <h1
        onClick={() => toggleTodo(index)}
        className={
          item.completed
            ? "line-through text-3xl cursor-pointer text-gray-400 "
            : "text-3xl cursor-pointer"
        }
      >
        {item.text}
      </h1>
      <div className="flex flex-row justify-start items-center gap-2 text-sm font-normal">
        <button
          onClick={() => editTodo(index)}
          className="bg-slate-950 p-[0.7rem] outline-none border-none text-gray-200 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(index)}
          className="bg-slate-950 p-[0.7rem] outline-none border-none text-gray-200 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
