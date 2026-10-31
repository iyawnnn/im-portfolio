import type { SVGProps } from "react";

const paths = [
  "M269 28 362 82 336 98 305 81 228 128 257 145 231 161 136 106 163 90 193 108 271 61 242 44Z",
  "M406 96V139L248 234 135 167V184L248 251 390 165 406 173V223L248 317 91 228 106 219 218 282V266L91 194V97L248 190Z",
  "M406 239V390L362 413V304L248 372 135 309V413L91 390V244L248 333Z",
  "M185 352 197 359 210 381 195 391 185 387 199 378Z",
  "M212 395 239 410V417L212 403Z",
  "M181 401 248 438 315 401V437L248 472 181 437Z",
];

export function IanMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="85 22 327 456" aria-hidden="true" {...props}>
      <g
        data-mark-outline
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
      >
        {paths.map((d) => (
          <path key={d} d={d} pathLength="1" vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g data-mark-fill fill="currentColor">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
