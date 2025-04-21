export function isValidCard(cardNumber: string): boolean {
    const digits = cardNumber.split('').reverse().map(Number);
    const sum = digits.reduce((acc, val, i) =>
      i % 2 === 1 ? acc + ((val * 2 > 9) ? val * 2 - 9 : val * 2) : acc + val, 0);
    return sum % 10 === 0;
  }
  
  export function maskCard(card: string): string {
    return card.slice(0, 6) + '******' + card.slice(-4);
  }
  