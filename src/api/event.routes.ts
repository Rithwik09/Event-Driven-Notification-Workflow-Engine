import { Router } from "express";
import { emitEvent } from "./controller/event.controller";

const router = Router();

router.post("/", emitEvent);

export default router;
