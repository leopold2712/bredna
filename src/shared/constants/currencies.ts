type currencyOption = {
  value: string;
  label: string;
};

export const getCurrencies = (): currencyOption[] => [
  { value: 'usd', label: 'USD' },
  { value: 'ils', label: 'ILS' },
];

export const getCurrencyPrefix = (currency: string | undefined): string => {
  switch (currency) {
    case 'usd':
      return '$';
    case 'ils':
      return '₪';
    default:
      return '';
  }
};
