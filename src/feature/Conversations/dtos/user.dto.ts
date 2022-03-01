import { ChatMetaDTO } from './meta.dto';

export type ChatUserDTO = {
  id: number;
  name: string;
  thumbnail: string;
  meta?: ChatMetaDTO[];
};
