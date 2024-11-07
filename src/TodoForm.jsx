import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  // retrive todoarray from local storage
  useEffect(() => {
    //only fetch if initial render is not true

    const savedTodo = localStorage.getItem("todoArray");
    if (savedTodo) {
      setAllTodo(JSON.parse(savedTodo));
    }
    setInitialRender(true);
  }, []);

  function submissionManager(e) {
    e.preventDefault();
    if (isEditing !== null) {
      const updatedAllTodo = [...allTodo];
      updatedAllTodo[isEditing] = todo;
      setAllTodo(updatedAllTodo);
      setIsEditing(null);
    } else {
      setAllTodo([...allTodo, todo]);
      //   console.log("normal mode");
    }
    setTodo("");
  }

  function editTodo(index) {
    setTodo(allTodo[index]);
    setIsEditing(index);
  }

  function deleteTodo(index) {
    const filterdTodo = allTodo.filter((item, filteredIndex) => {
      return filteredIndex !== index;
    });
    setAllTodo(filterdTodo);
  }

  //save todo to local storage
  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem("todoArray", JSON.stringify(allTodo));
    }
  }, [allTodo, initialRender]);

  return (
    <div className="h-auto w-[40%] flex flex-col gap-8">
      <form
        onSubmit={submissionManager}
        className="w-full h-auto flex flex-col justify-start items-center gap-3"
      >
        <input
          className="border-none w-full text-gray-900 text-lg h-auto p-4 outline-none   rounded-md"
          type="text"
          placeholder="Enter your todo "
          value={todo || " "}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black cursor-pointer text-white text-lg font-medium w-full p-4 outline-none border-none rounded-md "
        >
          Add Todo
        </button>
      </form>

      <div className="w-full h-auto">
        {allTodo.map((item, index) => {
          return (
            <TodoItem
              item={item}
              index={index}
              key={index}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    </div>
  );
}
