import type { RootState } from '../../../main/store/rootReducer';
import { MyProfileDTO } from '../../../shared/dtos/myProfile.dto';

export const getLoadedProfile = (state: RootState): MyProfileDTO => state.myProfile.user!;
