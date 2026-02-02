import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

// 🔴 THIS LINE IS REQUIRED
app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
