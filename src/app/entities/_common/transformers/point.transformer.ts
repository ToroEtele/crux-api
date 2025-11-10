import { Coordinate } from '@entities/field-season/types/coordinate.type';

export const pointTransformer = {
  from: (value: string | null) => {
    if (value === null) return null;

    const match = value.match(/POINT\(([^ ]+) ([^)]+)\)/);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);

      return {
        lng,
        lat
      };
    }

    throw new Error('Invalid WKT format');
  },
  to: (value: Coordinate | null) => {
    if (!value) return null;

    return `POINT(${value.lng} ${value.lat})`;
  }
};
