import lines from "./routes.json";

export type LngLat = [number, number];

export const routeLines = lines as Record<"d1" | "d2" | "d3" | "d4" | "d5", LngLat[]>;

export function cutLine(line: LngLat[], at: { lon: number; lat: number }) {
  let best = 0;
  let bestD = Infinity;
  line.forEach(([lon, lat], index) => {
    const d = (lon - at.lon) ** 2 + (lat - at.lat) ** 2;
    if (d < bestD) {
      bestD = d;
      best = index;
    }
  });
  const next = line.slice(0, best + 1);
  return next.length >= 2 ? next : line;
}
