"use client";
import { updateTodo, deleteTodo } from "@/actions/todo";
import { Trash } from "@phosphor-icons/react";
import { Todo } from "@prisma/client";
import Link from "next/link";
import React, { useOptimistic } from "react";
import StatusButton from "./statusButton";

type TodoItemProps = {
  todo: Todo;
  setOptimisticTodos: (action: {
    value: Todo;
    type: "create" | "update" | "delete";
  }) => void;
};

const TodoItem = ({ todo, setOptimisticTodos }: TodoItemProps) => {
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOptimisticTodos({ value: todo, type: "delete" });
    deleteTodo(todo.id);
  };

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    setOptimisticTodos({
      value: updatedTodo,
      type: "update",
    });
    updateTodo(updatedTodo);
  };

  return (
    <Link
      href={`/${todo.id}`}
      className="flex gap-4 items-center rounded-md p-4 bg-gray-800/70"
    >
      <StatusButton
        handleComplete={handleComplete}
        completed={todo.isCompleted}
      />

      <div className={`flex-grow ${todo.isCompleted ? "line-through" : ""}`}>
        {todo.title}
      </div>

      <Trash
        onClick={handleDelete}
        size={20}
        className="text-red-700/50 hover:text-red-700"
      />
    </Link>
  );
};

export default TodoItem;
