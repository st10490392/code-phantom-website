import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/utils";

/**
 * The official CodePhantom logo asset (uploaded by the founder, public/logo.png)
 * is a full lockup — mark, wordmark and tagline baked into one image.
 * public/mark.png is a losslessly-cropped square of that same asset's
 * emblem (no re-drawing, no regeneration) used at small sizes where the
 * full lockup would be illegible.
 */
export function Logo({
  className,
  size = 40,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cx(
        "flex items-center gap-3 group focus-visible:outline-none",
        className
      )}
      aria-label="CodePhantom Technologies — Home"
    >
      <span
        className="relative flex-shrink-0 overflow-hidden rounded-xl ring-1 ring-metallic-silver/15 transition-shadow duration-300 group-hover:shadow-glow"
        style={{ width: size, height: size }}
      >
        <Image
          src="/mark.png"
          alt="CodePhantom Technologies"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display font-semibold tracking-wide text-ghost-white text-[1.05rem]">
            CODE<span className="text-phantom-purple">PHANTOM</span>
          </span>
          <span className="text-[0.6rem] tracking-[0.25em] text-muted-text mt-0.5 hidden sm:block">
            TECHNOLOGIES
          </span>
        </span>
      )}
    </Link>
  );
}
