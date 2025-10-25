const logos = [
  { name: 'Slack' },
  { name: 'Figma' },
  { name: 'Stripe' },
  { name: 'Notion' },
  { name: 'Vercel' },
  { name: 'Webflow' },
  { name: 'Dropbox' },
];

const TickerRow = ({ logos, className }: { logos: {name: string}[]; className?: string }) => (
  <div className={className}>
    <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
      {[...logos, ...logos].map((logo, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center justify-center p-4 sm:p-6 md:p-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary rounded-md"
        >
          <span className="text-lg font-semibold text-muted-foreground/80 tracking-wide">{logo.name}</span>
        </a>
      ))}
    </div>
  </div>
);

export function LogoTicker() {
  return (
    <div className="mt-16 md:mt-24" aria-label="Our trusted partners">
      <p className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-8">
        Trusted by teams at
      </p>
      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        style={
          {
            '--gradient-width': '200px',
            '--gradient-color-start': 'hsl(var(--background))',
            '--gradient-color-end': 'hsla(var(--background), 0)',
          } as React.CSSProperties
        }
      >
        <div className="w-full flex flex-col gap-4 md:gap-6">
            <TickerRow logos={logos} className="logo-ticker-animation-left" />
            <TickerRow logos={logos} className="logo-ticker-animation-right" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[var(--gradient-width)] bg-gradient-to-r from-[var(--gradient-color-start)] to-[var(--gradient-color-end)]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[var(--gradient-width)] bg-gradient-to-l from-[var(--gradient-color-start)] to-[var(--gradient-color-end)]"></div>
      </div>
    </div>
  );
}
