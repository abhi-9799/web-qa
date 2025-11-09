import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body || {};
  // minimal server-side validation
  if (!name || !email || !password) return res.status(400).json({ ok: false, error: "Missing fields" });
  // pretend to do work
  setTimeout(() => res.json({ ok: true, id: Date.now() }), 300);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
