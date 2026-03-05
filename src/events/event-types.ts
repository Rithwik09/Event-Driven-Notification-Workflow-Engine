export type EventType =
  | "USER_REGISTERED"
  | "ORDER_CREATED"
  | "PASSWORD_RESET_REQUESTED";

export interface BaseEvent<T = any> {
  eventType: EventType;
  payload: T;
  metadata: {
    requestId: string;
    timestamp: string;
  };
}
