# Event-Driven Workflow & Notification Engine

A scalable, event-driven backend system designed to process asynchronous workflows, notifications, and system events with reliability, retries, and observability.

This project models how modern backend platforms handle internal events, background jobs, and failure-prone workflows at scale.

---

## Overview

In real-world systems, user actions rarely trigger a single synchronous operation.  
Instead, they emit **events** that are processed asynchronously by background workers.

This project implements a **production-style event-driven architecture** where:

- APIs emit domain events
- Events are queued for asynchronous processing
- Workers consume and process jobs independently
- Failures are retried automatically
- Exhausted jobs are routed to a dead-letter queue
- All actions are audited and observable

---

## Core Features

### Event Producer API

- REST APIs emit structured domain events
- Events represent system facts (e.g. `USER_REGISTERED`)
- Metadata added for traceability

### Message Queue

- Redis-backed queues using BullMQ
- Supports retries, delays, and backoff strategies
- Decouples producers from consumers

### Worker Services

- Independent background workers
- Email, webhook, SMS, and audit processors
- Idempotent and fault-tolerant execution

### Retry & Dead Letter Queue

- Automatic retries with exponential backoff
- Failed jobs routed to a Dead Letter Queue (DLQ)
- DLQ jobs can be inspected or replayed

### Notification System

- Email notifications
- Webhook triggers
- SMS hooks (pluggable / mocked)

### Authentication & RBAC

- JWT-based authentication
- Role-based access control
- Admin and User roles

### Rate Limiting

- Protects APIs from abuse
- Configurable per user or IP

### Audit Logs

- Tracks all critical system actions
- Event emissions, job processing, failures
- Persisted in PostgreSQL

### Observability

- Structured application logs
- Queue-level metrics
- Failure tracing
- Designed for extension to monitoring tools

---

## ️ High-Level Architecture

Client / Service
|
v
REST API (Event Producer)
|
v
Redis Queue (BullMQ)
|
v
Worker Services
|        |        |
Email   Webhook   Audit Log
|        |
Retry   Dead Letter Queue

## Tech Stack

| Layer | Technology |
| ----- | ----------- |
| Runtime | Node.js |
| API Framework | Express / Fastify |
| Queue | Redis + BullMQ |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Authorization | RBAC |
| Infrastructure | Docker (optional) |
| Logging | Winston / Pino |

---

## Project Structure

src/
├─ api/
│   ├─ routes/
│   ├─ controllers/
│   └─ middlewares/
├─ events/
│   ├─ producers/
│   └─ event-types.js
├─ queues/
│   ├─ index.js
│   └─ queue-config.js
├─ workers/
│   ├─ email.worker.js
│   ├─ webhook.worker.js
│   └─ audit.worker.js
├─ auth/
│   ├─ jwt.js
│   └─ rbac.js
├─ db/
│   └─ prisma/
├─ logs/
└─ app.js

## Example Event Payload

```json
{
  "eventType": "USER_REGISTERED",
  "payload": {
    "userId": "uuid",
    "email": "user@example.com"
  },
  "metadata": {
    "requestId": "uuid",
    "timestamp": "2026-01-01T12:00:00Z"
  }
}
````

---

## Design Principles

- Asynchronous-first architecture
- Loose coupling between services
- Failure is expected, not exceptional
- Clear separation of concerns
- Production-inspired patterns

---

## Non-Goals

This project intentionally avoids:

- Frontend UI
- Over-engineered microservices
- Cloud vendor lock-in
- Framework-heavy abstractions

The focus is **backend system design and reliability**.

---

## Resume Highlights

- Designed and implemented an event-driven backend using message queues and background workers
- Built producer-consumer architecture with retries and dead-letter queues
- Implemented RBAC, rate limiting, and JWT authentication
- Enabled async notifications via email, webhooks, and SMS
- Added audit logging and observability for system events

---

## ️ Roadmap

### Phase 1

- Project setup
- API scaffolding
- Redis + BullMQ integration

### Phase 2

- Worker services
- Retry & DLQ
- PostgreSQL + Prisma

### Phase 3

- RBAC
- Audit logging
- Rate limiting

### Phase 4

- Dockerization
- Monitoring enhancements
- Documentation polish
