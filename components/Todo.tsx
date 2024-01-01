"use client";
import { createTodo } from "@/actions/todo";
import { Todo } from "@prisma/client";
import { useOptimistic, useState } from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";

type TodoFormProps = {
  todos: Todo[];
};

const TodoForm = ({ todos }: TodoFormProps) => {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (
      state: Todo[],
      { value, type }: { value: Todo; type: "create" | "update" | "delete" }
    ) => {
      switch (type) {
        case "create":
          return [...state, value];
        case "update":
          return [...state.map((e) => (e.id === value.id ? value : e))];
        case "delete":
          return [...state.filter((e) => e.id !== value.id)];
      }
    }
  );

  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOptimisticTodos({
      value: {
        id: Date.now().toString(),
        title: value,
        isCompleted: false,
        description: "",
        createdAt: new Date(),
      },
      type: "create",
    });
    createTodo(value);
  };
  return (
    <>
      <Input onChange={handleChange} value={value} />
      <button onClick={handleClick} className="bg-primary py-2 rounded-md">
        Add
      </button>

      {todos && (
        <ul className="mt-8 space-y-4">
          {optimisticTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              setOptimisticTodos={setOptimisticTodos}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoForm;
