import { ChatMessageDTO } from '../dtos/message.dto';

export type MessageResponse = {
  code: number; // <- response code
  data: ChatMessageDTO; // <- message
  message: string; // <- error message
};
