import { Genders } from '../../../shared/constants/genders';
import { EducationDTOForUpdate } from '../../../shared/dtos/education.dto';
import { CertificateDTO } from '../../../shared/dtos/certificate.dto';

export type UpdateMyProfileDTO = {
  first_name: string;
  last_name: string;
  original_image?: string;
  cover_video: string | null;
  cover_video_original_image: string | null;
  professional_title_id: number | null;
  professional_title_text: string | null;
  about: string;
  gender?: Genders;
  phone_number: string;
  time_zone_id: number;
  country_id: number | null;
  state_id: number | null;
  primary_language_id: number | null;
  language_ids: (number | null)[];
  years_of_experience: number;
  skills: SkillDTO[];
  education: EducationDTOForUpdate[];
  certificates: Partial<CertificateDTO>[];
  offered_product_ids: number[];
};

export type SkillDTO = {
  id: number;
  name: string;
};
