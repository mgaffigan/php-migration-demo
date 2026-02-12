import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default async function NotesPage() {
  const notes = await query<Note[]>("SELECT * FROM notes ORDER BY created_at DESC");

  return (
    <>
      <h1>Notes</h1>
      <p className="text-muted">Informational messages and notes.</p>

      {notes.length === 0 ? (
        <p className="text-muted">No notes available.</p>
      ) : (
        <div className="row">
          {notes.map((note) => (
            <div key={note.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.content}</p>
                </div>
                <div className="card-footer text-muted small">
                  {new Date(note.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
