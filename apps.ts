import express from "express";
import eventRoutes from "./src/api/event.routes";

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);

export default app;
