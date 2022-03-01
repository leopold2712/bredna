import { ClientDTO } from '../../../shared/dtos';
import { StateEntity } from '../../../shared/models/StateEntity';
import { ClientSession } from '../dtos';
import { JourneyDTO } from '../dtos/journey.dto';

export type ClientJourneysState = {
  client: ClientDTO;
  journeys: StateEntity<JourneyDTO>;
  sessionsHistory: StateEntity<ClientSession>;
  loading: boolean;
};
