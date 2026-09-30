import {
  chargeOverview,
  checks,
  days,
  fixes,
  packing,
  weatherOverview,
  type Stop,
} from "@/lib/content";
import { amapSearch } from "@/lib/gcj02";
import { cutLine, routeLines } from "@/lib/routes";
import { Picture, StopList } from "./Media";
import { RouteMap } from "./RouteMap";

function take(dayId: string, stopId: string) {
  const day = days.find((item) => item.id === dayId);
  return day?.stops.find((stop) => stop.id === stopId);
}

export function Overview({
  done,
  onToggle,
}: {
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const ordered = [
    take("d1", "huangpu"),
    take("d1", "nanhua"),
    take("d1", "hotel"),
    take("d2", "south-gate"),
    take("d2", "bailang"),
    take("d3", "wuling"),
    take("d4", "yangtian"),
  ].filter((stop): stop is Stop => Boolean(stop));

  const south = take("d2", "south-gate");
  const lake = take("d2", "bailang");
  const meadow = take("d4", "yangtian");
  const square = take("d3", "wuling");

  const lines = [
    { points: routeLines.d5 },
    { points: south ? cutLine(routeLines.d2, { lon: south.lon!, lat: south.lat! }) : routeLines.d2 },
  ];
  if (south?.lon != null && lake?.lon != null && lake.lat != null && south.lat != null) {
    lines.push({
      points: [
        [south.lon, south.lat],
        [lake.lon, lake.lat],
      ],
      dashed: true,
    } as { points: [number, number][]; dashed?: boolean });
  }
  if (square?.lon != null && meadow?.lon != null && square.lat != null && meadow.lat != null) {
    lines.push({
      points: [
        [square.lon, square.lat],
        [meadow.lon, meadow.lat],
      ],
      dashed: true,
    } as { points: [number, number][]; dashed?: boolean });
  }

  return (
    <article className="day">
      <p className="kicker">10/2–10/6 · 黄埔出发</p>
      <h1>粤北到湘南</h1>
      <p className="lede">
        两晚韶关之外，电都补在住的地方和中午那一顿。高椅岭下午进、天黑前出。博物馆国庆照常开。
      </p>

      <div className="rail preview">
        <Picture pic={days[0].lead} priority />
        <Picture pic={days[1].lead} />
        <Picture pic={days[2].lead} />
        <Picture pic={days[3].lead} />
      </div>

      <section id="fixes" className="block">
        <h2>三处修正</h2>
        {fixes.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section id="map" className="block">
        <h2>全程</h2>
        <RouteMap
          scope="overview"
          caption="实线是往返大路和高椅岭南门。虚线只指向东江湖和仰天湖的方位，不是自驾进景区。"
          lines={lines}
          pins={ordered.flatMap((stop, index) =>
            stop.lon == null || stop.lat == null
              ? []
              : [
                  {
                    id: stop.id,
                    n: index + 1,
                    name: stop.name,
                    lon: stop.lon,
                    lat: stop.lat,
                    hollow: stop.hollow,
                  },
                ],
              )}
        />
        <StopList scope="overview" stops={ordered} />
        <p className="source">
          坐标来自 OpenStreetMap 公开名称，路形来自 OSRM 公开道路，2026-09-30 检索后抽稀。对不上的点不猜。开车以高德为准。
        </p>
      </section>

      <section id="charge" className="block">
        <h2>补能</h2>
        {chargeOverview.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.phone && item.phoneText ? (
              <a className="btn" href={item.phone}>
                {item.phoneText}
              </a>
            ) : null}
            {item.search ? (
              <a className="btn ghost" href={amapSearch(item.search)} target="_blank" rel="noreferrer">
                高德搜索
              </a>
            ) : null}
          </article>
        ))}
      </section>

      <section id="weather" className="block">
        <h2>天气和衣服</h2>
        {weatherOverview.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
        <ul className="notes">
          {packing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="todo" className="block">
        <h2>出发前</h2>
        <div className="card">
          {checks.map((item) => (
            <button
              key={item.id}
              type="button"
              className="check"
              aria-pressed={Boolean(done[item.id])}
              onClick={() => onToggle(item.id)}
            >
              <i />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <p className="source">勾选记在这台手机上，换一部手机不会跟着走。</p>
      </section>
    </article>
  );
}
