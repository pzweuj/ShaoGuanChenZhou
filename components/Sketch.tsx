"use client";

import { useId } from "react";

export const sketchIds = [
  "gaoyiling",
  "yangtian",
  "qilou",
  "museum",
  "yuhou",
  "highway",
  "dumpling",
  "stomach",
  "chicken",
  "soup",
  "snail",
  "sesame",
  "noodle",
  "riceNoodle",
  "fishNoodle",
  "mijiao",
  "trout",
  "grilled",
  "jar",
  "sugar",
  "lamp",
] as const;

export type SketchId = (typeof sketchIds)[number];

const food = new Set<SketchId>([
  "dumpling",
  "stomach",
  "chicken",
  "soup",
  "snail",
  "sesame",
  "noodle",
  "riceNoodle",
  "fishNoodle",
  "mijiao",
  "trout",
  "grilled",
  "jar",
  "sugar",
  "lamp",
]);

export function Sketch({ id, label }: { id: SketchId; label: string }) {
  const uid = useId().replace(/:/g, "");
  const scenic = !food.has(id);
  return (
    <figure className="sketch">
      <svg
        viewBox={scenic ? "0 0 360 220" : "0 0 200 200"}
        role="img"
        aria-label={`${label}，手帐插画，不是实拍`}
      >
        <defs>
          <pattern
            id={`${uid}-dot`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.6" fill="#1c1915" opacity="0.08" />
          </pattern>
        </defs>
        {scenic ? <Scenes id={id} /> : <Foods id={id} />}
        <rect
          width={scenic ? 360 : 200}
          height={scenic ? 220 : 200}
          fill={`url(#${uid}-dot)`}
        />
      </svg>
      <figcaption>手帐插画，不是实拍</figcaption>
    </figure>
  );
}

function Scenes({ id }: { id: SketchId }) {
  if (id === "gaoyiling") return <Gaoyiling />;
  if (id === "yangtian") return <Yangtian />;
  if (id === "qilou") return <Qilou />;
  if (id === "museum") return <Museum />;
  if (id === "yuhou") return <Yuhou />;
  return <Highway />;
}

function Foods({ id }: { id: SketchId }) {
  return (
    <>
      <rect width="200" height="200" fill="#f4efe6" />
      {id === "dumpling" && <Dumpling />}
      {id === "stomach" && <Stomach />}
      {id === "chicken" && <Chicken />}
      {id === "soup" && <Soup />}
      {id === "snail" && <Snail />}
      {id === "sesame" && <Sesame />}
      {id === "noodle" && <Noodle wavy={false} />}
      {id === "riceNoodle" && <Noodle wavy meat />}
      {id === "fishNoodle" && <Noodle wavy fish />}
      {id === "mijiao" && <Mijiao />}
      {id === "trout" && <Trout />}
      {id === "grilled" && <Grilled />}
      {id === "jar" && <Jar />}
      {id === "sugar" && <Sugar />}
      {id === "lamp" && <Lamp />}
    </>
  );
}

function Gaoyiling() {
  return (
    <g>
      <rect width="360" height="220" fill="#f6e7d4" />
      <circle cx="292" cy="42" r="16" fill="#e39a55" />
      <path d="M0 150 48 78 86 118 128 52 168 112 206 70 248 124 292 64 332 108 360 90 360 220 0 220Z" fill="#d07a52" />
      <path d="M0 168 60 124 104 148 150 108 198 150 246 112 300 146 360 124 360 220 0 220Z" fill="#a84b34" />
      <path d="M108 156c28-8 62-18 108-34" fill="none" stroke="#f7f1e6" strokeWidth="5" />
      <path d="M118 158v12M150 148v14M186 136v12M220 128v10" stroke="#f7f1e6" strokeWidth="2" />
      <path d="M250 118 268 96 286 118" fill="none" stroke="#1c1915" strokeWidth="1.4" />
    </g>
  );
}

function Yangtian() {
  return (
    <g>
      <rect width="360" height="220" fill="#e7f0ea" />
      <path d="M0 120C60 90 100 150 170 120s90-40 190-10v110H0Z" fill="#8eae86" />
      <path d="M0 150c70-30 120 20 190-8 50-20 90 10 170-16v94H0Z" fill="#6d8f68" />
      <path d="M0 176c80-16 140 8 220-12 40-8 80 6 140-8v64H0Z" fill="#c9d7b4" />
      <path d="M40 168c20-18 28-18 40 0M120 160c16-16 24-16 36 0M230 156c18-20 30-18 42 2" fill="none" stroke="#1f6f68" strokeWidth="1.2" />
      <circle cx="64" cy="48" r="10" fill="#f4efe6" opacity="0.8" />
    </g>
  );
}

function Qilou() {
  return (
    <g>
      <rect width="360" height="220" fill="#1d2c33" />
      <rect y="150" width="360" height="70" fill="#16343a" />
      <path d="M0 168h360" stroke="#d7c4a3" strokeWidth="3" opacity="0.5" />
      {[18, 78, 138, 198, 258].map((x) => (
        <g key={x}>
          <path d={`M${x} 150 V78 h44 V150`} fill="#c45c28" />
          <path d={`M${x + 4} 150 v-28 a18 18 0 0 1 36 0 V150`} fill="#f3e2c4" />
          <rect x={x + 14} y="86" width="16" height="12" fill="#f6e2b0" />
          <circle cx={x + 22} cy="132" r="3" fill="#e39a55" />
        </g>
      ))}
    </g>
  );
}

function Museum() {
  return (
    <g>
      <rect width="360" height="220" fill="#efe6d6" />
      <rect x="70" y="78" width="220" height="92" fill="#f7f3ea" stroke="#1c1915" strokeWidth="2" />
      <rect x="150" y="48" width="60" height="30" fill="#1f6f68" />
      <path d="M40 170h280" stroke="#1c1915" strokeWidth="2" />
      <rect x="96" y="112" width="28" height="40" fill="#d7c4a3" />
      <rect x="166" y="104" width="36" height="48" fill="#1c1915" />
      <rect x="236" y="112" width="28" height="40" fill="#d7c4a3" />
      <circle cx="48" cy="150" r="16" fill="#6d8a62" />
      <circle cx="312" cy="148" r="18" fill="#6d8a62" />
    </g>
  );
}

function Yuhou() {
  return (
    <g>
      <rect width="360" height="220" fill="#1c2430" />
      <path d="M0 150h360v70H0Z" fill="#1a3c44" />
      <path d="M70 150c30-48 70-48 100 0" fill="none" stroke="#e7d3b4" strokeWidth="8" />
      <path d="M70 150c30-36 70-36 100 0" fill="#c45c28" />
      <rect x="190" y="96" width="120" height="54" fill="#8d3d28" />
      <rect x="206" y="108" width="18" height="14" fill="#f6e2b0" />
      <rect x="236" y="108" width="18" height="14" fill="#f6e2b0" />
      <rect x="266" y="108" width="18" height="14" fill="#f6e2b0" />
      <circle cx="120" cy="118" r="4" fill="#e39a55" />
    </g>
  );
}

function Highway() {
  return (
    <g>
      <rect width="360" height="220" fill="#e7eef0" />
      <path d="M0 90c80 20 120-30 200-10 50 12 90 8 160-20v160H0Z" fill="#b7c9b4" />
      <path d="M0 130c90 10 130-40 220-16 40 8 80 4 140-18v124H0Z" fill="#8eae8a" />
      <path d="M40 200C120 120 180 150 250 80 290 48 320 70 360 40" fill="none" stroke="#f4efe6" strokeWidth="16" />
      <path d="M40 200C120 120 180 150 250 80" fill="none" stroke="#c45c28" strokeWidth="2" strokeDasharray="8 8" />
      <circle cx="168" cy="142" r="6" fill="#1c1915" />
    </g>
  );
}

function Bowl({
  fill,
  children,
}: {
  fill: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <ellipse cx="100" cy="132" rx="68" ry="16" fill="#e4d3b6" />
      <path d="M38 104c2 40 28 62 62 62s60-22 62-62" fill={fill} stroke="#1c1915" strokeWidth="2" />
      <ellipse cx="100" cy="104" rx="62" ry="16" fill="#fffaf3" stroke="#1c1915" strokeWidth="2" />
      {children}
    </g>
  );
}

function Dumpling() {
  return (
    <g>
      <ellipse cx="100" cy="118" rx="70" ry="28" fill="#d7b48a" stroke="#1c1915" strokeWidth="2" />
      <ellipse cx="100" cy="108" rx="58" ry="20" fill="#f3e6cf" stroke="#1c1915" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${58 + i * 18} 96c6 10 8 10 14 0`}
          fill="none"
          stroke="#1c1915"
          strokeWidth="1.4"
        />
      ))}
    </g>
  );
}

function Stomach() {
  return (
    <g>
      <ellipse cx="100" cy="108" rx="62" ry="40" fill="#f7f3ea" stroke="#1c1915" strokeWidth="2" />
      <path d="M58 100h70M62 114h58M70 128h40" stroke="#e7d3c4" strokeWidth="6" />
      <path d="M120 92c10 8 8 16-2 18" fill="none" stroke="#1f6f68" strokeWidth="2" />
    </g>
  );
}

function Chicken() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="64" ry="40" fill="#f7f3ea" stroke="#1c1915" strokeWidth="2" />
      <path d="M62 104h28l8 16-20 8zM108 98l24 6 4 18-22 6zM84 120l16 14-18 6z" fill="#f0d2a8" stroke="#1c1915" strokeWidth="1.4" />
      <path d="M70 92c8-10 16-8 18 2M130 90c6 8 2 14-6 12" fill="none" stroke="#1f6f68" strokeWidth="2" />
    </g>
  );
}

function Soup() {
  return (
    <Bowl fill="#f7f1e4">
      <path d="M70 100c8-8 14-6 16 2 6-10 16-8 18 2" fill="none" stroke="#c45c28" strokeWidth="2" />
      <ellipse cx="108" cy="104" rx="14" ry="5" fill="#e7d8b8" />
    </Bowl>
  );
}

function Snail() {
  return (
    <g>
      <path d="M48 130c8 28 96 36 112 8 6-10-8-16-20-8" fill="#c46a45" stroke="#1c1915" strokeWidth="2" />
      <path d="M70 118c8-16 22-20 28-6 6 12-6 20-16 16" fill="none" stroke="#1c1915" strokeWidth="2" />
      <path d="M118 112c10-14 24-12 26 2" fill="none" stroke="#1c1915" strokeWidth="2" />
    </g>
  );
}

function Sesame() {
  return (
    <Bowl fill="#2a241f">
      <ellipse cx="100" cy="104" rx="40" ry="10" fill="#1c1915" />
      <path d="M118 78c18 8 22 28 8 36" fill="none" stroke="#d7c4a3" strokeWidth="3" />
    </Bowl>
  );
}

function Noodle({
  wavy,
  meat,
  fish,
}: {
  wavy?: boolean;
  meat?: boolean;
  fish?: boolean;
}) {
  return (
    <Bowl fill="#f7f1e4">
      {wavy ? (
        <path d="M62 100c8 8 8 8 16 0s8-8 16 0 8 8 16 0 8-8 16 0" fill="none" stroke="#e7d3b4" strokeWidth="3" />
      ) : (
        <path d="M68 96h64M64 106h70M70 116h56" stroke="#d7b48a" strokeWidth="3" />
      )}
      {meat && <ellipse cx="112" cy="102" rx="10" ry="6" fill="#c46a45" />}
      {fish && <path d="M96 98l16 4-16 6z" fill="#7f93a3" />}
    </Bowl>
  );
}

function Mijiao() {
  return (
    <g>
      {[70, 108, 142].map((x) => (
        <path
          key={x}
          d={`M${x - 16} 120c0-24 32-24 32 0 0 10-8 16-16 16s-16-6-16-16z`}
          fill="#f3e6cf"
          stroke="#1c1915"
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

function Trout() {
  return (
    <g>
      <rect x="28" y="70" width="52" height="36" rx="6" fill="#f7f3ea" stroke="#1c1915" strokeWidth="1.5" />
      <path d="M36 82h36M36 92h28" stroke="#c46a45" strokeWidth="3" />
      <ellipse cx="118" cy="88" rx="28" ry="16" fill="#d7b48a" stroke="#1c1915" strokeWidth="1.5" />
      <ellipse cx="100" cy="132" rx="22" ry="12" fill="#fffaf3" stroke="#1c1915" strokeWidth="1.5" />
    </g>
  );
}

function Grilled() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="70" ry="28" fill="#f3e6cf" stroke="#1c1915" strokeWidth="2" />
      <path d="M48 112c20-16 40-16 60 0s40 12 64-4" fill="none" stroke="#c45c28" strokeWidth="3" />
      <circle cx="78" cy="108" r="2" fill="#1c1915" />
    </g>
  );
}

function Jar() {
  return (
    <g>
      <path d="M70 70h60l8 18c8 40-8 78-38 78s-48-38-40-78z" fill="#a84b34" stroke="#1c1915" strokeWidth="2" />
      <rect x="78" y="58" width="44" height="14" rx="4" fill="#d7b48a" stroke="#1c1915" strokeWidth="2" />
      <path d="M86 110h28M82 124h34" stroke="#f3e2c4" strokeWidth="3" />
    </g>
  );
}

function Sugar() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="46" ry="28" fill="#c45c28" stroke="#1c1915" strokeWidth="2" />
      <ellipse cx="100" cy="104" rx="34" ry="16" fill="#e39a55" />
    </g>
  );
}

function Lamp() {
  return (
    <g>
      <ellipse cx="100" cy="116" rx="48" ry="22" fill="#f3e6cf" stroke="#1c1915" strokeWidth="2" />
      <ellipse cx="100" cy="108" rx="28" ry="10" fill="#fffaf3" stroke="#1c1915" strokeWidth="1.5" />
      <path d="M100 96v-16" stroke="#1c1915" strokeWidth="2" />
    </g>
  );
}
