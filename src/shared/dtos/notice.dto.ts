export type NoticeDTO = {
  id: number;
  subject: string;
  body: string;
  attachments: {
    name: string;
    url: string;
  }[];
  created_at: Date;
};
