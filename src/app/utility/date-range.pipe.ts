import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: true,
  pure: true,
})
export class DateRangePipe implements PipeTransform {
  transform(start: Date | string | null | undefined,
            end: Date | string | null | undefined,
            locale: string = 'en-GB'): string {
    if (!start || !end) return '';

    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return '';

    const sameMonth = s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth();
    const sameYear  = s.getFullYear() === e.getFullYear();

    const dayFmt            = new Intl.DateTimeFormat(locale, { day: 'numeric' });
    const dayMonthFmt       = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' });
    const dayMonthYearFmt   = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });

    if (sameMonth) {
      // -> 2 - 6 Jun 2025
      return `${dayFmt.format(s)} - ${dayMonthYearFmt.format(e)}`;
    }
    if (sameYear) {
      // -> 28 Jun - 2 Jul 2025
      return `${dayMonthFmt.format(s)} - ${dayMonthYearFmt.format(e)}`;
    }
    // -> 30 Dec 2025 - 3 Jan 2026
    return `${dayMonthYearFmt.format(s)} - ${dayMonthYearFmt.format(e)}`;
  }
}
