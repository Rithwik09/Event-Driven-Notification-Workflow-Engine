import express from "express";
import eventRoutes from "./src/api/event.routes";
import ragRoutes from "./src/api/rag.routes";

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/rag", ragRoutes);

export default app;
