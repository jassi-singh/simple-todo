import TodoForm from "../components/Todo";
import { getTodos } from "@/actions/todo";

export default async function Home() {
  const todos = await getTodos();
  return (
    <main className="flex min-h-screen flex-col px-96 py-24 gap-4">
      <h1 className="text-2xl">My Todos</h1>

      <TodoForm todos={todos??[]} />
    </main>
  );
}
