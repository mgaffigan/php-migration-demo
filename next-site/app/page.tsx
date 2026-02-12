import Link from "next/link";
import { query } from "@/lib/db";

// Prevent static generation at build time - needs DB connection
export const dynamic = "force-dynamic";

interface CountResult {
  "COUNT(*)": number;
}

export default async function Home() {
  const [todoResult] = await query<CountResult[]>("SELECT COUNT(*) FROM todos");
  const [noteResult] = await query<CountResult[]>("SELECT COUNT(*) FROM notes");

  const todoCount = todoResult["COUNT(*)"];
  const noteCount = noteResult["COUNT(*)"];

  return (
    <div className="row">
      <div className="col-md-8">
        <h1>Welcome to PHP Demo</h1>
        <p className="lead">
          A simple PHP application demonstrating basic CRUD operations with MySQL.
        </p>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">To-Do List</h5>
                <p className="card-text">
                  Manage your tasks with full CRUD operations.
                </p>
                <p className="text-muted">{todoCount} item(s)</p>
                <Link href="/todos" className="btn btn-primary">
                  View To-Dos
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Notes</h5>
                <p className="card-text">
                  Browse informational notes and messages.
                </p>
                <p className="text-muted">{noteCount} note(s)</p>
                <Link href="/notes.php" className="btn btn-secondary">
                  View Notes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title">Tech Stack</h5>
            <ul className="list-unstyled mb-0">
              <li>Next.js 15</li>
              <li>MySQL 8.0</li>
              <li>Bootstrap 5</li>
              <li>Docker</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
