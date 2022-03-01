export type EducationModel = {
  id?: string;
  degree: string;
  major: string;
  college: string;
  start_year: string;
  end_year: string;
  deleted?: boolean;
};

export type CertificateModel = {
  id?: string;
  title: string;
  subtitle: string;
  fileSource?: string | null;
  fileName?: string;
  thumbnail?: string | null;
  deleted?: boolean;
};
