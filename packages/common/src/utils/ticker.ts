export const getExchangePercent = (exchange: string): number => {
  switch (exchange) {
    case 'UPCOM':
      return 5;
    case 'HSX':
      return 6;
    case 'HNX':
      return 7;
    default:
      return 0;
  }
};
