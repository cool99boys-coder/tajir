export function formatBirr(amount: number): string {
  return `${amount.toLocaleString('en-US')} Birr`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}