"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  dayStatus,
  days,
  shanghaiToday,
  tabs,
  type TabId,
} from "@/lib/content";
import { DayView } from "./DayView";
import { Overview } from "./Overview";

const STORAGE_KEY = "sgcz-checklist-2026";
const CHECK_EVENT = "sgcz-check";

function subscribeChecks(onStoreChange: () => void) {
  window.addEventListener(CHECK_EVENT, onStoreChange);
  return () => window.removeEventListener(CHECK_EVENT, onStoreChange);
}

function readChecks() {
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}

function isTab(value: string | null): value is TabId {
  return tabs.some((tab) => tab.id === value);
}

export function TripApp() {
  const params = useSearchParams();
  const router = useRouter();
  const today = shanghaiToday();
  const todayId = days.find((day) => day.date === today)?.id;
  const requested = params.get("day");
  const active: TabId = isTab(requested) ? requested : (todayId ?? "overview");
  const index = tabs.findIndex((tab) => tab.id === active);
  const day = days.find((item) => item.id === active);
  const rawChecks = useSyncExternalStore(subscribeChecks, readChecks, () => "{}");
  let done: Record<string, boolean> = {};
  try {
    const parsed = JSON.parse(rawChecks) as unknown;
    if (parsed && typeof parsed === "object") done = parsed as Record<string, boolean>;
  } catch {
    done = {};
  }

  useEffect(() => {
    document.getElementById(`tab-${active}`)?.scrollIntoView({
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const setDay = useCallback(
    (id: TabId) => {
      const url = new URL(window.location.href);
      url.searchParams.set("day", id);
      router.replace(`${url.pathname}?${url.searchParams.toString()}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      const nextIndex = event.key === "ArrowRight" ? index + 1 : index - 1;
      const nextTab = tabs[nextIndex];
      if (nextTab) setDay(nextTab.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, setDay]);

  function toggle(id: string) {
    const next = { ...done, [id]: !done[id] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHECK_EVENT));
  }

  const anchors = day
    ? [
        ["map", "地图"],
        ["timeline", "时间"],
        ["food", "吃"],
        ["notes", "注意"],
      ]
    : [
        ["fixes", "修正"],
        ["charge", "补能"],
        ["weather", "天气"],
        ["todo", "待办"],
      ];

  const prev = index > 0 ? tabs[index - 1] : null;
  const next = index < tabs.length - 1 ? tabs[index + 1] : null;

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <strong>粤北到湘南</strong>
          <span>10/2–10/6</span>
        </div>
        <nav className="tabs" role="tablist" aria-label="日期">
          {tabs.map((tab) => {
            const match = days.find((item) => item.id === tab.id);
            const status = match ? dayStatus(match.date, today) : "";
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={tab.id === active}
                onClick={() => setDay(tab.id)}
              >
                {tab.label}
                {status ? <small>{status}</small> : null}
              </button>
            );
          })}
        </nav>
        <nav className="anchors" aria-label="本页章节">
          {anchors.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main>{day ? <DayView day={day} /> : <Overview done={done} onToggle={toggle} />}</main>
      <nav className="thumb" aria-label="前后天">
        <button type="button" disabled={!prev} onClick={() => prev && setDay(prev.id)}>
          上一天
        </button>
        <strong>{tabs[index]?.label}</strong>
        <button type="button" disabled={!next} onClick={() => next && setDay(next.id)}>
          下一天
        </button>
      </nav>
    </div>
  );
}
