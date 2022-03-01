export type AnalyticsTableDTO = {
  grossPayment: {
    USD: number;
  };
  processingFee: {
    fee: number;
    USD: number;
  };
  netPaymentBeforeIrs: {
    USD: number;
  };
  netPaymentAfterIrs: {
    USD: number;
  };
  irs: {
    pay: {
      USD: number;
    };
    fee: number;
    type: string;
  };
  details: {
    amount: number;
    currencySymbol: string;
    expertRev: number;
    eventDate: string;
    paidWithId: number;
    paidWithName: string;
    paidWithType: string;
    planName: string;
    planType: string;
    purchasedAt: string;
    revInPrecent: number;
    role: string;
    scenario: string;
    sourceAutoAssigned: boolean;
    sourceName: string;
    stripeId: string;
    subscriptionId: number;
    userId: number;
    userName: string;
  }[];
};
