"use client";
import { updateTodo, deleteTodo } from "@/actions/todo";
import { Trash } from "@phosphor-icons/react";
import { Todo } from "@prisma/client";
import Link from "next/link";
import React, { useOptimistic } from "react";
import StatusButton from "./statusButton";
import toast from "react-hot-toast";

type TodoItemProps = {
  todo: Todo;
  setOptimisticTodos: (action: {
    value: Todo[];
    type: "create" | "update" | "delete" | "init";
  }) => void;
};

const TodoItem = ({ todo, setOptimisticTodos }: TodoItemProps) => {
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    setOptimisticTodos({ value: [todo], type: "delete" });
    deleteTodo(todo.id).catch((e) => {
      toast.error(e.message);
    });
  };

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    setOptimisticTodos({
      value: [updatedTodo],
      type: "update",
    });
    updateTodo(updatedTodo);
  };

  return (
    <div className="flex gap-4 items-center rounded-md p-4 bg-gray-800/70">
      <StatusButton
        handleComplete={handleComplete}
        completed={todo.isCompleted}
      />

      <Link
        href={`/todo/${todo.id}`}
        className={`flex-grow hover:underline ${
          todo.isCompleted ? "line-through" : ""
        }`}
      >
        {todo.title}
      </Link>

      <Trash
        onClick={handleDelete}
        size={20}
        className="text-red-700/50 hover:text-red-700"
      />
    </div>
  );
};

export default TodoItem;
