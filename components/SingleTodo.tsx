"use client";

import { Todo } from "@prisma/client";
import StatusButton from "./statusButton";
import { updateTodo } from "@/actions/todo";
import { useEffect, useOptimistic, useRef, useState } from "react";
import { Textarea } from "./Input";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type SingleTodoProps = {
  todo: Todo;
};

const SingleTodo = ({ todo }: SingleTodoProps) => {
  const router = useRouter();
  const [description, setDescription] = useState(todo.description);
  const debouncedValue = useDebounce(description, 1000);
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (_state: Todo, updatedTodo: Todo) => {
      return updatedTodo;
    }
  );
  const debounceRef = useRef(true);

  const handleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedTodo = {
      ...optimisticTodo,
      isCompleted: !optimisticTodo.isCompleted,
    };
    setOptimisticTodo(updatedTodo);
    await updateTodo(updatedTodo);
    router.refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (debounceRef.current) {
      debounceRef.current = false;
      return;
    }
    const updatedTodo = {
      ...optimisticTodo,
      description: debouncedValue,
    };
    updateTodo(updatedTodo)
      .then(() => {
        toast.success("Todo updated");
      })
      .catch((err) => {
        toast.error("Error updating todo");
      });
  }, [debouncedValue]);

  return (
    <motion.div className='flex flex-col' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between">
        <h1 className="text-2xl">{optimisticTodo.title}</h1>
        <StatusButton
          handleComplete={handleComplete}
          completed={optimisticTodo.isCompleted}
        />
      </div>

      <Textarea
        onChange={handleChange}
        value={description}
        placeholder="description"
        className="text-gray-200"
      />
    </motion.div>
  );
};

export default SingleTodo;
