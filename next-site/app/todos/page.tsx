import { query } from "@/lib/db";
import { addTodo, toggleTodo, deleteTodo, updateTodo } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Todo {
  id: number;
  title: string;
  completed: number;
  created_at: string;
}

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit: editId } = await searchParams;
  const todos = await query<Todo[]>("SELECT * FROM todos ORDER BY created_at DESC");

  return (
    <>
      <h1>To-Do List</h1>

      <form action={addTodo} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Add new task..."
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      {todos.length === 0 ? (
        <p className="text-muted">No tasks yet. Add one above!</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editId === String(todo.id) ? (
                <form action={updateTodo} className="flex-grow-1 me-2">
                  <input type="hidden" name="id" value={todo.id} />
                  <div className="input-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      defaultValue={todo.title}
                      required
                    />
                    <button type="submit" className="btn btn-success btn-sm">
                      Save
                    </button>
                    <Link href="/todos" className="btn btn-secondary btn-sm">
                      Cancel
                    </Link>
                  </div>
                </form>
              ) : (
                <>
                  <div className="d-flex align-items-center flex-grow-1">
                    <form action={toggleTodo} className="me-2">
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit"
                        className={`btn btn-sm ${
                          todo.completed ? "btn-success" : "btn-outline-secondary"
                        }`}
                      >
                        {todo.completed ? "✓" : "○"}
                      </button>
                    </form>
                    <span className={todo.completed ? "completed" : ""}>
                      {todo.title}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/todos?edit=${todo.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Edit
                    </Link>
                    <form action={deleteTodo} className="d-inline">
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
