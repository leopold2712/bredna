export type CertificateDTO = {
  id?: number;
  title: string;
  description: string;
  file: string | null;
  _destroy?: boolean;
};
