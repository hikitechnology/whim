export type ClientMessage = {
  receiver: string;
  message: string;
};

export type ServerMessage = {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  timestamp: number;
};
