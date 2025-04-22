export function isValidCard(cardNumber: string): boolean {
    let sum = 0;
    let alternate = false;
  
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      const char = cardNumber.charAt(i);
  
      if (!/^\d$/.test(char)) return false; // Non-digit check
  
      let n = parseInt(char, 10);
  
      if (alternate) {
        n *= 2;
        if (n > 9) {
          n -= 9;
        }
      }
  
      sum += n;
      alternate = !alternate;
    }
  
    return sum % 10 === 0;
  }
  
  
  export function maskCard(card: string): string {
    return card.slice(0, 6) + '******' + card.slice(-4);
  }
  