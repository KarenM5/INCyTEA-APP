import { Router } from "express";
import crypto from "node:crypto";
import pool from "../db.js";

const router = Router();

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// GET /api/personal
router.get("/", async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, role_id, direccion, phone, email, created_at, updated_at FROM personal ORDER BY created_at DESC"
  );
  res.json(rows);
});

// GET /api/personal/:id
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, role_id, direccion, phone, email, created_at, updated_at FROM personal WHERE id = ?",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
});

// POST /api/personal
router.post("/", async (req, res) => {
  const { name, role_id, direccion, phone, email, password } = req.body;
  if (!name || !role_id || !phone || !email || !password) {
    return res.status(400).json({ error: "Todos los campos obligatorios son requeridos" });
  }
  if (role_id === "direccion" && !direccion) {
    return res.status(400).json({ error: "El campo dirección es obligatorio para este rol" });
  }

  const password_hash = hashPassword(password);
  const [result] = await pool.query(
    "INSERT INTO personal (name, role_id, direccion, phone, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
    [name, role_id, direccion || null, phone, email, password_hash]
  );

  const [rows] = await pool.query(
    "SELECT id, name, role_id, direccion, phone, email, created_at, updated_at FROM personal WHERE id = ?",
    [result.insertId]
  );
  res.status(201).json(rows[0]);
});

// PUT /api/personal/:id
router.put("/:id", async (req, res) => {
  const { name, role_id, direccion, phone, email, password } = req.body;
  if (!name || !role_id || !phone || !email) {
    return res.status(400).json({ error: "Todos los campos obligatorios son requeridos" });
  }

  const password_hash = password ? hashPassword(password) : undefined;

  const fields = ["name", "role_id", "direccion", "phone", "email"];
  const values = [name, role_id, direccion || null, phone, email];

  if (password_hash) {
    fields.push("password_hash");
    values.push(password_hash);
  }

  values.push(req.params.id);

  await pool.query(
    `UPDATE personal SET ${fields.map((f) => `${f} = ?`).join(", ")} WHERE id = ?`,
    values
  );

  const [rows] = await pool.query(
    "SELECT id, name, role_id, direccion, phone, email, created_at, updated_at FROM personal WHERE id = ?",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
});

// DELETE /api/personal/:id
router.delete("/:id", async (req, res) => {
  const [result] = await pool.query("DELETE FROM personal WHERE id = ?", [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
  res.json({ message: "Eliminado correctamente" });
});

export default router;
