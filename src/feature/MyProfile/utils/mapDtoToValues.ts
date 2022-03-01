import { MyProfileDTO } from '../../../shared/dtos/myProfile.dto';
import { DefaultProfileValues } from '../constants/DefaultProfileValues';
import { UpdateMyProfileDTO } from '../dto/UpdateMyProfileDTO';

export const mapDtoToValues = (
  defaults: {
    defaultCountryID: number | null;
    defaultStateID: number | null;
    defaultLanguageID: number | null;
  },
  dto?: MyProfileDTO,
): UpdateMyProfileDTO => ({
  offered_product_ids: dto?.offered_products?.map((product) => product.id) || [],
  first_name: dto?.first_name || '',
  last_name: dto?.last_name || '',
  phone_number: dto?.phone_number || '',
  gender: dto?.gender ? dto.gender : undefined,
  country_id: dto?.country?.id || defaults.defaultCountryID,
  time_zone_id: dto?.time_zone?.id ? +dto?.time_zone?.id : +DefaultProfileValues.TIMEZONE_ID,
  professional_title_id: dto?.professional_title ? dto?.professional_title?.id : null,
  professional_title_text: dto?.professional_title ? dto?.professional_title.text : null,
  state_id: dto?.state?.id || defaults.defaultStateID,
  years_of_experience: dto?.years_of_experience || 0,
  about: dto?.about || '',
  cover_video: dto?.video || '',
  cover_video_original_image: dto?.full_video_image_url || null,
  education:
    dto?.education.map((education) => ({
      ...education,
      degree: education.degree.name,
      college: education.college.name,
      major: education.major.name,
    })) || [],
  skills: dto?.skills || [],
  certificates: dto?.certificates || [],
  language_ids: dto?.languages.map((l) => l.id) || [defaults.defaultLanguageID],
  primary_language_id: dto?.primary_language?.id || defaults.defaultLanguageID,
});
