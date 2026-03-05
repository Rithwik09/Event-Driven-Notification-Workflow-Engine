import { Queue } from "bullmq";
import { redisConnection } from "./connection";

export const deadLetterQueue = new Queue("dead-letter-queue", {
  connection: redisConnection,
});
