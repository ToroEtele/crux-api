interface Item {
  id: number;
  name: string;
  totalCost: number;
  quantity?: number;
  [key: string]: any;
}

export function aggregateSmallValues<T extends Item>(
  items: T[],
  threshold = 0.03 // 3%
): T[] {
  if (!items.length) return [];

  const total = items.reduce((sum, item) => sum + item.totalCost, 0);
  if (total === 0) return items;

  const major: T[] = [];
  const minor: T[] = [];

  for (const item of items) {
    if (item.totalCost / total >= threshold) {
      major.push(item);
    } else {
      minor.push(item);
    }
  }

  if (minor.length > 0) {
    const otherSum = minor.reduce(
      (acc, item) => ({
        quantity: (acc.quantity ?? 0) + (item.quantity ?? 0),
        totalCost: acc.totalCost + item.totalCost
      }),
      { quantity: 0, totalCost: 0 }
    );

    const otherItem: T = {
      ...(minor[0] as any),
      id: 9999999999, // consistent fallback ID
      name: 'Other',
      ...otherSum
    };

    major.push(otherItem);
  }

  major.sort((a, b) => b.totalCost - a.totalCost);

  return major;
}
