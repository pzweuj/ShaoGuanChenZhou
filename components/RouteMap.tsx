"use client";

import { useEffect, useRef, useState } from "react";
import type { LngLat } from "@/lib/routes";
import "mapbox-gl/dist/mapbox-gl.css";

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
  token,
}: {
  scope: string;
  lines: { points: LngLat[]; dashed?: boolean }[];
  pins: MapPin[];
  caption: string;
  token: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const dataRef = useRef({ lines, pins, scope });
  dataRef.current = { lines, pins, scope };

  useEffect(() => {
    const container = ref.current;
    if (!container || !token) return;
    let map: import("mapbox-gl").Map | undefined;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled) return;
      const { lines: routeLines, pins: routePins, scope: routeScope } = dataRef.current;
      const coordinates = [
        ...routeLines.flatMap((line) => line.points),
        ...routePins.map((pin) => [pin.lon, pin.lat] as LngLat),
      ];
      if (coordinates.length === 0) return;

      map = new mapboxgl.Map({
        container,
        accessToken: token,
        style: "mapbox://styles/mapbox/light-v11",
        language: "zh-Hans",
        cooperativeGestures: true,
        dragRotate: false,
        touchPitch: false,
        pitchWithRotate: false,
        attributionControl: true,
        center: coordinates[0],
        zoom: 8,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
      map.on("error", () => setFailed(true));
      map.on("load", () => {
        if (!map) return;
        map.addSource("routes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: routeLines
              .filter((line) => line.points.length >= 2)
              .map((line) => ({
                type: "Feature" as const,
                properties: { dashed: Boolean(line.dashed) },
                geometry: { type: "LineString" as const, coordinates: line.points },
              })),
          },
        });
        map.addLayer({
          id: "routes-solid",
          type: "line",
          source: "routes",
          filter: ["!=", ["get", "dashed"], true],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#1e3a34", "line-width": 3 },
        });
        map.addLayer({
          id: "routes-dashed",
          type: "line",
          source: "routes",
          filter: ["==", ["get", "dashed"], true],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#9d3419", "line-width": 3, "line-dasharray": [1.4, 1.2] },
        });
        for (const pin of routePins) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = pin.hollow ? "map-pin hollow" : "map-pin";
          button.textContent = String(pin.n);
          button.setAttribute("aria-label", pin.name);
          button.addEventListener("click", () => scrollToPin(routeScope, pin.id));
          new mapboxgl.Marker({ element: button, anchor: "center" })
            .setLngLat([pin.lon, pin.lat])
            .addTo(map);
        }
        const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
        for (const point of coordinates) bounds.extend(point);
        map.fitBounds(bounds, { padding: 36, maxZoom: 13, duration: 0 });
      });
    })().catch(() => setFailed(true));

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [token]);

  return (
    <figure className="map-wrap">
      <div className="map" ref={ref} role="img" aria-label={caption} />
      {!token || failed ? <p className="source">地图没有打开。坐标和路线仍在下面。</p> : null}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
