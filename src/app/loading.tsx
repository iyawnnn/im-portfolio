import { IanMark } from "@/components/brand/ian-mark";

export default function Loading() {
  return (
    <div
      className="flex min-h-[calc(100dvh-10rem)] w-full flex-1 items-center justify-center lg:min-h-[100dvh]"
      role="status"
      aria-label="Loading page"
    >
      <IanMark className="route-loader-mark text-foreground" />
    </div>
  );
}
