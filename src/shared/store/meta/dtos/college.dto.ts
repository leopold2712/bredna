import { CountryDTO } from '../../../dtos';
import { SimpleType } from '../../../dtos/simple.dto';

export type CollegeDTO = SimpleType & { country: CountryDTO };
