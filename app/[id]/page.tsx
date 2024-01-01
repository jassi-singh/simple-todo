import { getTodoById } from "@/actions/todo";
import SingleTodo from "@/components/SingleTodo";

const Page = async ({ params }: { params: { id: string } }) => {
  const todo = await getTodoById(params.id);

  if (!todo) return <div>No Todo Found</div>;

  return (
    <main className="flex min-h-screen flex-col px-96 py-24 gap-4">
      <SingleTodo todo={todo} />
    </main>
  );
};

export default Page;
