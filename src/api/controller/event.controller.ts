import { Request, Response } from "express";
import { eventQueue } from "../../queues/event.queue";

export const emitEvent = async (req: Request, res: Response) => {
  if (!req.body) {
  return res.status(400).json({ message: "Request body missing" });
}
  const { eventType, payload } = req.body;

  if (!eventType || !payload) {
    return res.status(400).json({ message: "Invalid event payload" });
  }

  await eventQueue.add("EVENT_JOB", {
    eventType,
    payload,
    metadata: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    },
  });

  return res.status(202).json({
    message: "Event accepted for processing",
  });
};
