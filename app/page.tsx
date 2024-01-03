import Link from "next/link";
import TodoForm from "../components/Todo";
import { getTodos } from "@/actions/todo";

export default async function Home() {
  const todos = await getTodos();
  console.log('PAGE 1',todos)

  return (
    <main className="flex min-h-screen flex-col px-96 py-24 gap-4">
      <h1 className="text-2xl">My Todos</h1>
      <TodoForm todos={todos ?? []} />

      <footer>
        <Link href={"/about"}>About</Link>
      </footer>
    </main>
  );
}
