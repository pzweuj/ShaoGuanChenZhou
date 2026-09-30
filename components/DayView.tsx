import type { DayPlan } from "@/lib/content";
import { weekday } from "@/lib/content";
import { cutLine, routeLines } from "@/lib/routes";
import { Picture, StopList } from "./Media";
import { RouteMap, type MapPin } from "./RouteMap";

function pinsOf(stops: DayPlan["stops"]): MapPin[] {
  return stops.flatMap((stop, index) =>
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
  );
}

export function DayView({ day }: { day: DayPlan }) {
  const line = day.cutAt ? cutLine(routeLines[day.route], day.cutAt) : routeLines[day.route];

  return (
    <article className="day">
      <Picture pic={day.lead} priority />
      <p className="kicker">
        {day.date.slice(5)} {weekday(day.date)}
      </p>
      <h1>{day.title}</h1>
      <p className="lede">{day.summary}</p>
      <ul className="facts">
        <li>
          <span>住</span>
          {day.sleep}
        </li>
        <li>
          <span>天气</span>
          {day.weather}
        </li>
        <li>
          <span>路程</span>
          {day.distance}
        </li>
      </ul>

      <section id="map" className="block">
        <h2>地图</h2>
        <RouteMap
          scope={day.id}
          caption={day.mapCaption}
          lines={[{ points: line }]}
          pins={pinsOf(day.stops)}
        />
        <StopList scope={day.id} stops={day.stops} />
        {day.inset ? (
          <div className="inset">
            <h3>{day.inset.title}</h3>
            <RouteMap
              scope={`${day.id}-inset`}
              caption={day.inset.caption}
              lines={[
                {
                  points: day.inset.stops.flatMap((stop) =>
                    stop.lon == null || stop.lat == null ? [] : [[stop.lon, stop.lat] as [number, number]],
                  ),
                  dashed: true,
                },
              ]}
              pins={pinsOf(day.inset.stops)}
            />
            <StopList scope={`${day.id}-inset`} stops={day.inset.stops} />
          </div>
        ) : null}
        {day.walk ? (
          <div className="walk">
            <h3>{day.walk.title}</h3>
            <ol>
              {day.walk.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ) : null}
        <p className="source">
          坐标来自 OpenStreetMap 公开名称，路形来自 OSRM 公开道路，2026-09-30 检索后抽稀。对不上的点不猜。开车以高德为准。
        </p>
      </section>

      <section id="timeline" className="block">
        <h2>时间</h2>
        <ol className="timeline">
          {day.timeline.map((item) => (
            <li key={item.time + item.title} className="moment">
              <p className="time">{item.time}</p>
              <h3>{item.title}</h3>
              {item.tags ? (
                <p className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag.label} className={`tag ${tag.tone}`}>
                      {tag.label}
                    </span>
                  ))}
                </p>
              ) : null}
              <p>{item.detail}</p>
              {item.pic ? <Picture pic={item.pic} /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section id="food" className="block">
        <h2>吃</h2>
        <p>{day.foodIntro}</p>
        {day.dishes.length > 0 ? (
          <div className="rail">
            {day.dishes.map((dish) => (
              <article key={dish.name} className="dish">
                {dish.pic ? <Picture pic={dish.pic} /> : null}
                <h3>{dish.name}</h3>
                <p className={`tag ${dish.spicy === "ok" ? "eat" : dish.spicy === "ask" ? "charge" : "hard"}`}>
                  {dish.spicy === "ok" ? "可以点" : dish.spicy === "ask" ? "说一声免辣" : "鲜辣，只试味"}
                </p>
                <p>{dish.note}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section id="notes" className="block">
        <h2>补能和注意</h2>
        {day.charges.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.phone && item.phoneText ? (
              <a className="btn" href={item.phone}>
                {item.phoneText}
              </a>
            ) : null}
            {item.search ? (
              <a
                className="btn ghost"
                href={`https://uri.amap.com/search?keyword=${encodeURIComponent(item.search)}&callnative=1`}
                target="_blank"
                rel="noreferrer"
              >
                高德搜索
              </a>
            ) : null}
          </article>
        ))}
        <ul className="notes">
          {day.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
