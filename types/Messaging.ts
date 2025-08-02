export type ServerMessage = {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string | number;
  clientId?: string;
};

export type LocalMessage = Omit<ServerMessage, "id" | "timestamp"> & {
  timestamp?: string | number;
  clientId?: string;
  delivered: boolean;
};

export type TypingEvent = {
  uid: string;
};

export type DeliveredEvent = {
  clientId: string;
  id: string;
  timestamp: string;
};
