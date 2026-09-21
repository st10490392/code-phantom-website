import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/network-background";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-24">
      <NetworkBackground className="absolute inset-0 opacity-30" />
      <div className="container-phantom relative text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyber-blue">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-ghost-white md:text-5xl">
          This system doesn&rsquo;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-text">
          The page you&rsquo;re looking for has moved or was never built.
        </p>
        <div className="mt-10">
          <Button href="/">Return Home</Button>
        </div>
      </div>
    </section>
  );
}
