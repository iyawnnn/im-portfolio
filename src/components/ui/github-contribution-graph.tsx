"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import useSWR from "swr";

type Day = { date: string; contributionCount: number };
type ContributionWeek = { contributionDays: Day[] };
type Data = { totalContributions: number; weeks: ContributionWeek[] };
type ApiResponse = Data | { error: string };

const FULL_YEAR_WEEK_COUNT = 53;

const fetcher = async (url: string): Promise<Data> => {
  const response = await fetch(url);
  const payload = (await response.json()) as ApiResponse;

  if (!response.ok || "error" in payload) {
    throw new Error("Unable to load GitHub contributions.");
  }

  return payload;
};

function intensity(count: number) {
  if (count === 0) {
    return "border-zinc-200 bg-zinc-100 dark:border-white/5 dark:bg-black";
  }
  if (count <= 3) {
    return "border-zinc-300 bg-zinc-300 dark:border-white/5 dark:bg-zinc-800";
  }
  if (count <= 6) {
    return "border-zinc-500 bg-zinc-500 dark:border-white/5 dark:bg-zinc-600";
  }
  if (count <= 9) {
    return "border-zinc-700 bg-zinc-700 dark:border-white/5 dark:bg-zinc-400";
  }
  return "border-zinc-900 bg-zinc-900 dark:border-white/5 dark:bg-white";
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
const dateLabelCache = new Map<string, string>();

function dateLabel(date: string) {
  const cachedLabel = dateLabelCache.get(date);
  if (cachedLabel) return cachedLabel;

  const label = dateFormatter.format(new Date(`${date}T00:00:00`));
  dateLabelCache.set(date, label);
  return label;
}

function graphMetrics(width: number) {
  if (width >= 768) return { cellSize: 11, gap: 3 };
  if (width >= 480) return { cellSize: 10, gap: 3 };
  return { cellSize: 9, gap: 2 };
}

function useGraphLayout(totalWeeks: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = (width: number) => {
      const nextWidth = Math.floor(width);
      setContainerWidth((currentWidth) =>
        currentWidth === nextWidth ? currentWidth : nextWidth,
      );
    };

    updateWidth(element.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) =>
      updateWidth(entry.contentRect.width),
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return useMemo(() => {
    const { cellSize, gap } = graphMetrics(containerWidth);
    const visibleWeekCount = containerWidth
      ? Math.max(
          0,
          Math.min(
            totalWeeks,
            Math.floor((containerWidth + gap) / (cellSize + gap)),
          ),
        )
      : 0;

    return { containerRef, cellSize, gap, visibleWeekCount };
  }, [containerWidth, totalWeeks]);
}

function monthLabels(weeks: ContributionWeek[]) {
  const candidates = weeks.flatMap((week, weekIndex) => {
    const firstDay = week.contributionDays[0];
    const monthStart = week.contributionDays.find(
      (day) => day.date.slice(8) === "01",
    );
    const day = monthStart ?? (weekIndex === 0 ? firstDay : undefined);
    return day
      ? [{
          weekIndex,
          key: day.date.slice(0, 7),
          label: monthFormatter.format(new Date(`${day.date}T00:00:00`)),
        }]
      : [];
  });

  if (candidates[1]?.weekIndex < 3) candidates.shift();

  return candidates.reduce<typeof candidates>((labels, candidate) => {
    const previous = labels.at(-1);
    if (
      (!previous || candidate.weekIndex - previous.weekIndex >= 3) &&
      (candidate.weekIndex === 0 || candidate.weekIndex + 3 <= weeks.length)
    ) {
      labels.push(candidate);
    }
    return labels;
  }, []);
}

function ContributionGrid({
  weeks,
  cellSize,
  gap,
  totalContributions,
}: {
  weeks: ContributionWeek[];
  cellSize: number;
  gap: number;
  totalContributions: number;
}) {
  const firstDay = weeks[0]?.contributionDays[0];
  const lastDay = weeks.at(-1)?.contributionDays.at(-1);
  const visibleRange =
    firstDay && lastDay
      ? `${dateLabel(firstDay.date)} through ${dateLabel(lastDay.date)}`
      : "the available date range";
  const labels = monthLabels(weeks);
  const gridRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLParagraphElement>(null);

  const hideTooltip = () => {
    if (tooltipRef.current) tooltipRef.current.hidden = true;
  };

  const showTooltip = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const cell = target.closest<HTMLElement>("[data-contribution-cell]");
    const grid = gridRef.current;
    const tooltip = tooltipRef.current;
    if (!cell || !grid || !tooltip || !grid.contains(cell)) return;

    const count = Number(cell.dataset.count ?? 0);
    if (tooltipTextRef.current) {
      tooltipTextRef.current.textContent = `${count} contribution${
        count === 1 ? "" : "s"
      } on ${cell.dataset.dateLabel ?? ""}`;
    }

    tooltip.hidden = false;
    tooltip.style.visibility = "hidden";
    const cellRect = cell.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const inset = 4;
    const minimum = tooltipWidth / 2 + inset - gridRect.left;
    const maximum =
      window.innerWidth - gridRect.left - tooltipWidth / 2 - inset;
    const center = cellRect.left - gridRect.left + cellRect.width / 2;
    const tooltipX = Math.min(
      Math.max(center, minimum),
      maximum,
    );
    const placeBelow = cellRect.top < gridRect.top + 72;

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${
      cellRect.top - gridRect.top + (placeBelow ? cellRect.height : 0)
    }px`;
    tooltip.style.transform = placeBelow
      ? "translate(-50%, 8px)"
      : "translate(-50%, calc(-100% - 8px))";
    tooltip.style.visibility = "";
  };

  return (
    <div>
      <div
        className="mb-2 grid h-4 justify-between"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, ${cellSize}px)`,
          columnGap: gap,
        }}
        aria-hidden="true"
      >
        {labels.map(({ weekIndex, key, label }) => (
          <span
            key={key}
            style={{ gridColumnStart: weekIndex + 1 }}
            className="text-xs text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>
      <div
        ref={gridRef}
        className="relative grid w-full justify-between"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, ${cellSize}px)`,
          columnGap: gap,
        }}
        role="img"
        aria-label={`GitHub contribution activity: ${totalContributions.toLocaleString()} contributions. Showing ${visibleRange}. Square intensity indicates contribution count.`}
        onPointerOver={showTooltip}
        onPointerLeave={hideTooltip}
      >
        {weeks.map((week, weekIndex) => (
          <div
            key={`${week.contributionDays[0]?.date ?? "week"}-${weekIndex}`}
            className="grid"
            style={{
              gridTemplateRows: `repeat(7, ${cellSize}px)`,
              rowGap: gap,
            }}
          >
            {week.contributionDays.map((day) => {
              const countLabel = `${day.contributionCount} contribution${
                day.contributionCount === 1 ? "" : "s"
              } on ${dateLabel(day.date)}`;
              return (
                <span
                  key={day.date}
                  aria-hidden="true"
                  title={countLabel}
                  data-contribution-cell=""
                  data-date-label={dateLabel(day.date)}
                  data-count={day.contributionCount}
                  className={`block rounded-[2px] border ${intensity(day.contributionCount)}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    gridRow: new Date(`${day.date}T00:00:00`).getDay() + 1,
                  }}
                />
              );
            })}
          </div>
        ))}
        <div
          ref={tooltipRef}
          hidden
          aria-hidden="true"
          className="pointer-events-none absolute z-50 max-w-[calc(100vw-0.5rem)] whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-left text-xs text-popover-foreground shadow-sm"
        >
          <p ref={tooltipTextRef} />
        </div>
      </div>
    </div>
  );
}

function LoadingGrid({
  weeks,
  cellSize,
  gap,
}: {
  weeks: number;
  cellSize: number;
  gap: number;
}) {
  return (
    <div className="animate-pulse">
      <div
        className="mb-2 grid h-4 justify-between"
        style={{
          gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
          columnGap: gap,
        }}
      >
        <span className="h-3 w-8 rounded bg-muted" />
      </div>
      <div
        className="grid w-full justify-between"
        style={{
          gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
          columnGap: gap,
        }}
      >
        {Array.from({ length: weeks }, (_, weekIndex) => (
          <div
            key={weekIndex}
            className="grid"
            style={{
              gridTemplateRows: `repeat(7, ${cellSize}px)`,
              rowGap: gap,
            }}
          >
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <span
                key={dayIndex}
                className="rounded-[2px] bg-muted"
                style={{ width: cellSize, height: cellSize }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GitHubContributionGraph() {
  const { data, error, isLoading } = useSWR<Data>(
    "/api/github-contributions",
    fetcher,
    { revalidateOnFocus: false },
  );
  const totalWeeks = data?.weeks.length ?? FULL_YEAR_WEEK_COUNT;
  const { containerRef, cellSize, gap, visibleWeekCount } =
    useGraphLayout(totalWeeks);
  const visibleWeeks = data?.weeks.slice(-visibleWeekCount) ?? [];
  return (
    <section
      aria-label="GitHub contributions"
      className="min-w-0 rounded-xl border border-border/50 bg-card p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div>
          <a
            href="https://github.com/iyawnnn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium uppercase text-muted-foreground hover:text-foreground"
          >
            GitHub activity
          </a>
          <h2 className="mt-1 text-lg font-medium">Contribution graph</h2>
        </div>
        {!error && data && (
          <p className="text-sm text-muted-foreground">
            {data.totalContributions.toLocaleString()} contributions in the last year
          </p>
        )}
        {!error && isLoading && (
          <span aria-hidden="true" className="h-5 w-64 max-w-full animate-pulse rounded bg-muted" />
        )}
      </div>
      <div ref={containerRef} className="min-w-0 w-full">
        {!error && isLoading && visibleWeekCount > 0 && (
          <div role="status" aria-label="Loading GitHub contributions">
            <LoadingGrid weeks={visibleWeekCount} cellSize={cellSize} gap={gap} />
          </div>
        )}
        {error && (
          <div
            role="status"
            className="flex min-h-32 items-center justify-center px-4 text-center text-sm text-muted-foreground"
          >
            GitHub activity is temporarily unavailable.
          </div>
        )}
        {!error && data && visibleWeekCount > 0 && (
          <ContributionGrid
            weeks={visibleWeeks}
            cellSize={cellSize}
            gap={gap}
            totalContributions={data.totalContributions}
          />
        )}
      </div>
      {!error && (
        <div aria-hidden="true" className="mt-4 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 1, 4, 7, 10].map((count) => (
            <span
              key={count}
              className={`size-[11px] rounded-[2px] border ${intensity(count)}`}
            />
          ))}
          <span>More</span>
        </div>
      )}
    </section>
  );
}
