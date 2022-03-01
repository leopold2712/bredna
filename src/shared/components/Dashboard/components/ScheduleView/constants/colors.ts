export enum Colors {
  VACANT = 'vacant',
  VACANT_PAST = 'vacant_past',
  BOOKED = 'booked',
  BOOKED_PAST = 'booked_past',
  DEFAULT = 'default',
}

export type ColorsType = { [key in Colors]: string };

export const colors: ColorsType = {
  [Colors.VACANT]: '#BFE4F8',
  [Colors.BOOKED]: '#248AD3',
  [Colors.VACANT_PAST]: '#dcdee1',
  [Colors.BOOKED_PAST]: '#596172',
  [Colors.DEFAULT]: '#fff',
};
