import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { SkillDTO } from '../../../../feature/MyProfile/dto/UpdateMyProfileDTO';
import { MetaState } from '../dtos/MetaState';
import { TimeZoneDTO } from '../../../dtos';
import { MainDTO } from '../../../dtos/MainDTO';
import { ProfessionalTitleDTO } from '../../../dtos/myProfile.dto';

type MetaNames = 'states' | 'timeZones' | 'professionalTitles';

interface Response extends Exclude<MetaState, MetaNames> {
  state: MainDTO[];
  time_zones: TimeZoneDTO[];
  professional_titles: ProfessionalTitleDTO[];
}

type MetaRes = Omit<Response, 'skills'>;

export const getMetaInfoAsync = createAsyncThunk<Response, void, ThunkConfig>(
  'meta/getMetaInfo',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{
        data: MetaRes;
      }>('/utils/meta');

      const skillsData = await axios.get<{ data: SkillDTO[] }>('/utils/skills');

      return { ...data, skills: skillsData.data.data };
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  },
);
