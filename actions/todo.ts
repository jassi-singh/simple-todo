"use server";

import prisma from "@/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createTodo = async (title: string) => {
  try {
    await prisma.todo.create({
      data: { title },
    });

    revalidate();
    console.log("todo added");
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async () => {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });

    revalidate();
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (todo: Partial<Todo>) => {
  try {
    const { id, ...todoWithoutId } = todo;
    await prisma.todo.update({
      where: {
        id: id,
      },
      data: todoWithoutId,
    });
    revalidate();
  } catch (error) {
    console.log(error);
  }
};

export const getTodoById = async (id: string) => {
  try {
    return prisma.todo.findFirst({ where: { id } });
  } catch (error) {
    // console.log(error);
  }
};

const revalidate = () => {
  const url = headers().get("x-url") ?? "/";
  console.log(url);
  revalidatePath(url);
};
