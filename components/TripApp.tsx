"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  dayStatus,
  days,
  defaultTab,
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

export function TripApp({ mapboxToken }: { mapboxToken: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const today = shanghaiToday();
  const requested = params.get("day");
  const active: TabId = isTab(requested) ? requested : defaultTab(today);
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
        ["charge", "补能"],
        ["weather", "天气"],
        ["todo", "待办"],
      ];

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <div>
            <p className="eyebrow">黄埔出发 · 五日</p>
            <strong>粤北到湘南</strong>
          </div>
          <span>10/2–10/6</span>
        </div>
        <nav className="tabs" role="tablist" aria-label="日期">
          {tabs.map((tab) => {
            const match = days.find((item) => item.id === tab.id);
            const status = match ? dayStatus(match.date, today) : "";
            const [when, ...where] = tab.label.split(" ");
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={tab.id === active}
                onClick={() => setDay(tab.id)}
              >
                <b>{when}</b>
                <small>{status || where.join(" ") || "五日"}</small>
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
      <main key={active}>
        {day ? (
          <DayView day={day} mapboxToken={mapboxToken} />
        ) : (
          <Overview done={done} onToggle={toggle} onOpen={setDay} mapboxToken={mapboxToken} />
        )}
      </main>
    </div>
  );
}
