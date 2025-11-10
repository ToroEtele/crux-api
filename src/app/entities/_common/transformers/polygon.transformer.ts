export const polygonTransformer = {
  from: (value: string | null) => {
    if (value === null) return null;
    const coordinates = value
      .split('((')[1]
      .split('))')[0]
      .split(',')
      .map((point: string) => {
        const cords = point.split(' ');
        return [parseFloat(cords[0]), parseFloat(cords[1])];
      });
    coordinates.pop();
    return coordinates.map((point) => ({
      lng: point[1],
      lat: point[0]
    }));
  },
  to: (value: Array<{ lat: number; lng: number }> | null) => {
    if (!value || value.length === 0) return null;

    const wktCoordinates = value.map((point) => `${point.lat} ${point.lng}`).join(', ');

    return `POLYGON((${wktCoordinates}))`;
  }
};
