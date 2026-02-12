import mysql from "mysql2/promise";

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "db",
    database: process.env.DB_NAME || "app",
    user: process.env.DB_USER || "app",
    password: process.env.DB_PASS || "secret",
  });
  return connection;
}

let initialized = false;

async function initDb(connection: mysql.Connection) {
  if (initialized) return;
  
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed TINYINT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed notes if empty
  const [rows] = await connection.execute("SELECT COUNT(*) as count FROM notes");
  const count = (rows as { count: number }[])[0].count;
  if (count === 0) {
    await connection.execute(`
      INSERT INTO notes (title, content) VALUES 
      ('Welcome', 'This is a simple PHP demo application.'),
      ('About MySQL', 'MySQL is a popular relational database used in production applications.'),
      ('Docker Setup', 'This app runs in Docker with PHP 8.2, Apache, and MySQL 8.0.')
    `);
  }
  
  initialized = true;
}

export async function query<T>(sql: string, params: unknown[] = []): Promise<T> {
  const connection = await getConnection();
  try {
    await initDb(connection);
    const [rows] = await connection.execute(sql, params);
    return rows as T;
  } finally {
    await connection.end();
  }
}
