export type MessageRequestDTO = {
  client_ids: number[];
  message: string;
  send_email: boolean;
  send_push: boolean;
  attachments?: [
    {
      name: string;
      url: string;
    },
  ];
};
