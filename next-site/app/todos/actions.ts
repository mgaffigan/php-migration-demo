"use server";

import { query, getConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title?.trim()) return;
  
  const connection = await getConnection();
  try {
    await connection.execute("INSERT INTO todos (title) VALUES (?)", [title.trim()]);
  } finally {
    await connection.end();
  }
  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  const connection = await getConnection();
  try {
    await connection.execute("UPDATE todos SET completed = NOT completed WHERE id = ?", [id]);
  } finally {
    await connection.end();
  }
  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  const connection = await getConnection();
  try {
    await connection.execute("DELETE FROM todos WHERE id = ?", [id]);
  } finally {
    await connection.end();
  }
  revalidatePath("/todos");
}

export async function updateTodo(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  if (!id || !title?.trim()) return;
  
  const connection = await getConnection();
  try {
    await connection.execute("UPDATE todos SET title = ? WHERE id = ?", [title.trim(), id]);
  } finally {
    await connection.end();
  }
  revalidatePath("/todos");
}
