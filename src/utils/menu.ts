import type { BusinessConfig } from '../types/business';
export function normalizeMenuDisplay(value: unknown) {
  const config = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const mode = config.mode === 'horizontal' || config.mode === 'paginated' ? config.mode : 'vertical';
  const pageSize = typeof config.pageSize === 'number' && Number.isSafeInteger(config.pageSize) && config.pageSize > 0 ? config.pageSize : 8;
  return { mode, pageSize } as const;
}
export function menuResults(menu: BusinessConfig['menu'], selected: string | null, requestedPage: number, pageSize: number) {
  const categories = menu.filter(category => category.items.length);
  const category = categories.find(category => category.id === selected);
  const items = (category ? [category] : categories).flatMap(category => category.items.map((item, index) => ({ item, category, index })));
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.max(1, Math.min(totalPages, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1));
  return { categories, items: items.slice((page - 1) * pageSize, page * pageSize), page, totalPages, totalItems: items.length, label: category?.name ?? 'All items' };
}
