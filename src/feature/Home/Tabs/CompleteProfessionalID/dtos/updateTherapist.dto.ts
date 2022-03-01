import { UpdateCertificateDTO } from './updateCertificate.dto';
import { UpdateEducationDTO } from './updateEducation.dto';
import { SkillDTO } from '../../../../MyProfile/dto/UpdateMyProfileDTO';

export type UpdateTherapistDTO = {
  first_name: string;
  last_name: string;
  original_image: string;
  crop_data: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  cover_video: string;
  professional_title_id: string;
  about: string;
  gender: string;
  phone_number: string;
  time_zone_id: number;
  country_id: number;
  state_id: number;
  primary_language_id: number;
  language_ids: number[];
  years_of_experience: number;
  skills: SkillDTO[];
  education: UpdateEducationDTO[];
  certificates: UpdateCertificateDTO[];
  offered_product_ids: number[];
};
