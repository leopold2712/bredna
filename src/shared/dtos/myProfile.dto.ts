import { CertificateDTO } from './certificate.dto';
import { EducationDTO } from './education.dto';
import { Genders } from '../constants/genders';
import { MainDTO } from './MainDTO';
import { OfferedProductDTO } from './offeredProduct.dto';
import { SkillDTO } from '../../feature/MyProfile/dto/UpdateMyProfileDTO';
import { TherapistProfileStatuses } from '../constants';

export type MyProfileDTO = {
  id: number;
  first_name: string;
  last_name: string;
  thumbnail: string;
  original_image: string;
  video: string;
  full_video_image_url: string;
  professional_title: {
    id: number;
    text: string;
  };
  about: string;
  email: string;
  phone_number: string;
  gender: Genders;
  country: MainDTO;
  state: MainDTO;
  primary_language: MainDTO;
  languages: MainDTO[];
  time_zone: MainDTO;
  years_of_experience: number;
  skills: SkillDTO[];
  education: EducationDTO[];
  certificates: CertificateDTO[];
  offered_products: OfferedProductDTO[];
  share_link: string;
  created_at: string;
  status: TherapistProfileStatuses;
};

export type ProfessionalTitleDTO = {
  id: number;
  text: string;
};
