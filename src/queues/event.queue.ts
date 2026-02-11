import { Queue } from "bullmq";
import { redisConnection } from "./connection";

export const eventQueue = new Queue("event-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
