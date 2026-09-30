import Image from "next/image";
import type { Pic, Stop } from "@/lib/content";
import { amapDrive, amapMarker, amapSearch } from "@/lib/gcj02";
import { Sketch } from "./Sketch";

export function Picture({ pic, priority = false }: { pic: Pic; priority?: boolean }) {
  if (pic.kind === "sketch") {
    return <Sketch id={pic.sketch} label={pic.alt} />;
  }

  return (
    <figure className="photo">
      <Image
        src={pic.src}
        alt={pic.alt}
        width={pic.width}
        height={pic.height}
        priority={priority}
        sizes="(max-width: 520px) 100vw, 480px"
        style={{ width: "100%", height: "auto" }}
      />
      <figcaption>
        <span>
          实拍 · {pic.artist} · {pic.license}
        </span>
        <a href={pic.href} target="_blank" rel="noreferrer">
          来源
        </a>
        {pic.note ? <span>{pic.note}</span> : null}
      </figcaption>
    </figure>
  );
}

export function stopHref(stop: Stop) {
  if (stop.action === "search" || stop.lon == null || stop.lat == null) {
    return amapSearch(stop.keyword);
  }
  if (stop.action === "drive") return amapDrive(stop.lon, stop.lat, stop.keyword);
  return amapMarker(stop.lon, stop.lat, stop.keyword);
}

export function stopVerb(stop: Stop) {
  if (stop.action === "search" || stop.lon == null || stop.lat == null) return "搜索";
  if (stop.action === "drive") return "导航";
  return "位置";
}

export function StopList({ scope, stops }: { scope: string; stops: Stop[] }) {
  return (
    <ol className="stops">
      {stops.map((stop, index) => (
        <li key={stop.id} id={`pin-${scope}-${stop.id}`}>
          <a href={stopHref(stop)} target="_blank" rel="noreferrer">
            <span className={stop.hollow ? "num hollow" : "num"}>{index + 1}</span>
            <span>
              <strong>{stop.name}</strong>
              <small>{stop.note}</small>
            </span>
            <em>{stopVerb(stop)}</em>
          </a>
        </li>
      ))}
    </ol>
  );
}
