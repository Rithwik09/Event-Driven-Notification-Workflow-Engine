import { Worker, Job } from "bullmq";
import { redisConnection } from "../queues/connection";
import { BaseEvent } from "../events/event-types";
import { deadLetterQueue } from "../queues/dead-letter.queue";

const worker = new Worker(
  "event-queue",
  async (job: Job<BaseEvent>) => {
    console.log("📥 Processing event:", job.data.eventType);
    console.log("Payload:", job.data.payload);

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ Event processed:", job.id);
  },
  { connection: redisConnection }
);

// worker.on("failed", (job, err) => {
//   console.error("❌ Job failed:", job?.id, err.message);
worker.on("failed", async (job) => {
  if (!job) {
    return;
  }
  await deadLetterQueue.add("DEAD_JOB", job.data);
});

