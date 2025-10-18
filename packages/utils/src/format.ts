export function formatCurrency(value: number, currency: string = "USD", locale: string = "en-US"): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export function formatDate(date: Date | string, locale: string = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat(locale, options ?? { year: "numeric", month: "short", day: "2-digit" }).format(d);
  } catch {
    return d.toISOString();
  }
}

export function truncate(text: string, max: number, ellipsis: string = "…"): string {
  if (text.length <= max) return text;
  const slice = Math.max(0, max - ellipsis.length);
  return text.slice(0, slice) + ellipsis;
}
