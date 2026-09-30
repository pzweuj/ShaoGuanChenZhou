import Image from "next/image";
import type { Photo, Stop } from "@/lib/content";
import { amapDrive, amapMarker, amapSearch } from "@/lib/gcj02";

export function Picture({
  pic,
  priority = false,
  hero = false,
}: {
  pic: Photo;
  priority?: boolean;
  hero?: boolean;
}) {
  return (
    <figure className={hero ? "photo photo-hero" : "photo"}>
      <Image
        src={pic.src}
        alt={pic.alt}
        width={pic.width}
        height={pic.height}
        priority={priority}
        sizes={hero ? "(max-width: 520px) 100vw, 512px" : "(max-width: 520px) 92vw, 460px"}
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

export function AmapSearch({ keyword }: { keyword: string }) {
  return (
    <a className="plane" href={amapSearch(keyword)} target="_blank" rel="noreferrer" aria-label="高德搜索">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.4 11.3 20.6 4.2 14.4 20.8 11.2 13.4 3.4 11.3Z" />
        <path d="M11.2 13.4 20.6 4.2" />
      </svg>
    </a>
  );
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
