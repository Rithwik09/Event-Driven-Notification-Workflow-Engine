export interface BaseEvent<T = any> {
  eventType: string;
  payload: T;
  metadata: {
    requestId: string;
    timestamp: string;
  };
}
