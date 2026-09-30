"use client";

import type { LngLat } from "@/lib/routes";

function scrollToPin(scope: string, id: string) {
  document.getElementById(`pin-${scope}-${id}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export type MapPin = {
  id: string;
  n: number;
  name: string;
  lon: number;
  lat: number;
  hollow?: boolean;
};

export function RouteMap({
  scope,
  lines,
  pins,
  caption,
}: {
  scope: string;
  lines: { points: LngLat[]; dashed?: boolean }[];
  pins: MapPin[];
  caption: string;
}) {
  const all = [
    ...lines.flatMap((line) => line.points),
    ...pins.map((pin) => [pin.lon, pin.lat] as LngLat),
  ];
  if (all.length === 0) return null;

  const width = 360;
  const height = 240;
  const pad = 28;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const [lon, lat] of all) {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
  const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const cos = Math.cos(midLat) || 1;
  const spanX = Math.max((maxLon - minLon) * cos, 0.01);
  const spanY = Math.max(maxLat - minLat, 0.01);
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
  const usedW = spanX * scale;
  const usedH = spanY * scale;
  const offX = pad + (width - pad * 2 - usedW) / 2;
  const offY = pad + (height - pad * 2 - usedH) / 2;

  const project = (lon: number, lat: number) => {
    const x = offX + (lon - minLon) * cos * scale;
    const y = offY + (maxLat - lat) * scale;
    return [x, y] as const;
  };

  const placed: { x: number; y: number }[] = [];
  const drawn = pins.map((pin) => {
    const [x, startY] = project(pin.lon, pin.lat);
    let y = startY;
    for (const other of placed) {
      const dx = x - other.x;
      const dy = y - other.y;
      if (dx * dx + dy * dy < 20 * 20) y -= 18;
    }
    placed.push({ x, y });
    return { ...pin, x, y };
  });

  return (
    <figure className="map-wrap">
      <div className="map">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption}>
          <rect width={width} height={height} fill="#e7f0ea" />
          <path d="M0 168c40-18 80-8 120-20 50-16 90 10 140-8 30-8 60-4 100-16" fill="none" stroke="#c5ddd4" strokeWidth="10" />
          {lines.map((line, index) => {
            if (line.points.length < 2) return null;
            const d = line.points
              .map(([lon, lat], pointIndex) => {
                const [x, y] = project(lon, lat);
                return `${pointIndex === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
              })
              .join(" ");
            return (
              <path
                key={index}
                d={d}
                fill="none"
                stroke={line.dashed ? "#c45c28" : "#1f6f68"}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={line.dashed ? "7 6" : undefined}
              />
            );
          })}
          {drawn.map((pin) => (
            <g key={pin.id} transform={`translate(${pin.x} ${pin.y})`}>
              <circle r="16" fill="transparent" />
              <circle
                r="11"
                fill={pin.hollow ? "#f4efe6" : "#1c1915"}
                stroke="#1c1915"
                strokeWidth="2"
                strokeDasharray={pin.hollow ? "3 2" : undefined}
              />
              <text
                textAnchor="middle"
                y="4"
                fill={pin.hollow ? "#1c1915" : "#f7f3ea"}
                fontSize="11"
                fontWeight="700"
              >
                {pin.n}
              </text>
              <circle
                r="16"
                fill="transparent"
                style={{ cursor: "pointer" }}
                role="link"
                tabIndex={0}
                aria-label={pin.name}
                onClick={() => scrollToPin(scope, pin.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    scrollToPin(scope, pin.id);
                  }
                }}
              >
                <title>{pin.name}</title>
              </circle>
            </g>
          ))}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
