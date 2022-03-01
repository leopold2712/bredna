export type SendMessageRequestDTO = {
  client_ids: number[];
  subject: string;
  body: string;
  attachments?: string[];
};
