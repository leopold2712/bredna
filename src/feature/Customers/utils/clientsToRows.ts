import moment from 'moment';
import { SessionDTO } from '../../../shared/dtos/session.dto';
import { PlanDTO } from '../../../shared/dtos/plan.dto';
import { ClientDTO } from '../../../shared/dtos/client.dto';
import { ClientsTableRow } from '../models/ClientsTableRow';

const mapPlanToRow = (client: ClientDTO, plan: PlanDTO, clientsPlans: number) => ({
  id: `${client.id}-${plan.product.id}`,
  name: clientsPlans === 0 ? `${client.name || 'Not specified'}` : '',
  thumbnail: client.thumbnail,
  currentPlan: `${plan.product.name}`,
  expiredAt: moment(plan.expires_at).format('DD MMM YYYY'),
  usage: plan.total_credits ? `${plan.used_credits}/${plan.total_credits}` : `-`,
  lastInteractionDate: plan.last_interaction_made_at
    ? `${moment(plan.last_interaction_made_at).format('DD MMM YYYY')}`
    : '-',
  nextInteractionDate: plan.next_interaction_expected_at
    ? moment(plan.next_interaction_expected_at).format('DD MMM YYYY')
    : '-',
  tags: client.tags,
});

export const mapClientToTrial = (client: ClientDTO, session: SessionDTO): ClientsTableRow => ({
  id: `${client.id}-trial`,
  name: client.name || 'Not specified',
  thumbnail: client.thumbnail,
  currentPlan: 'Trial',
  expiredAt: moment(session.start_time).format('DD MMM YYYY'),
  usage: '1/1',
  lastInteractionDate: '-',
  nextInteractionDate: moment(session.start_time).format('DD MMM YYYY'),
  tags: client.tags,
});

export const clientsToRows = (clients: ClientDTO[], sessions?: SessionDTO[]): ClientsTableRow[] => {
  let updatedRows: ClientsTableRow[] = [];

  clients.forEach((client) => {
    const clientsPlans: ClientsTableRow[] = [];

    const plans = client.current_plans;
    /* client bought trial */
    if (plans.length === 0) {
      const session = sessions?.find((s) => s.participants[0].client.id === client.id);
      if (session) clientsPlans.push(mapClientToTrial(client, session));
    }

    plans.forEach((plan, index) => {
      if (
        clientsPlans.length === 0 ||
        plans[index].order_item_id !== plans[index - 1].order_item_id
      )
        clientsPlans.push(mapPlanToRow(client, plan, clientsPlans.length));
    });

    updatedRows = [...updatedRows, ...clientsPlans];
  });

  return updatedRows;
};
