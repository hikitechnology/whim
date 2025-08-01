export type ClientMessage = {
  receiver: string;
  message: string;
};

export type ServerMessage = {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string | number;
  clientId?: string;
};

export type TypingEvent = {
  uid: string;
};

export type DeliveredEvent = {
  clientId: string;
  id: string;
  timestamp: string;
};
