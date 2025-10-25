const logos = [
  { name: 'Slack', component: <SlackLogo /> },
  { name: 'Figma', component: <FigmaLogo /> },
  { name: 'Stripe', component: <StripeLogo /> },
  { name: 'Notion', component: <NotionLogo /> },
  { name: 'Vercel', component: <VercelLogo /> },
  { name: 'Webflow', component: <WebflowLogo /> },
  { name: 'Dropbox', component: <DropboxLogo /> },
];

const TickerRow = ({ logos, className }: { logos: typeof logos; className?: string }) => (
  <div className={className}>
    <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
      {[...logos, ...logos].map((logo, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center justify-center p-4 sm:p-6 md:p-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary rounded-md"
        >
          <span className="sr-only">{logo.name}</span>
          {logo.component}
        </a>
      ))}
    </div>
  </div>
);

export function LogoTicker() {
  const row1 = logos.slice(0, Math.ceil(logos.length / 2));
  const row2 = logos.slice(Math.ceil(logos.length / 2));
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

// SVG Logo Components
function SlackLogo() {
  return <svg role="img" aria-label="Slack logo" className="h-6 text-muted-foreground/60" viewBox="0 0 94 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M4.31.25a2.16 2.16 0 0 0-2.16 2.16v4.31h4.32V2.41a2.16 2.16 0 0 0-2.16-2.16Zm0 8.63a2.16 2.16 0 1 0 0 4.31V8.75h0Zm0 4.31a2.16 2.16 0 0 0 2.16 2.16H8.7v-4.32h-4.4v2.16h.01Zm2.16 2.16a2.16 2.16 0 0 0 4.32 0V8.75h-4.32v6.48Zm8.63 0a2.16 2.16 0 0 0 2.16-2.16V8.75H10.8v4.32h4.32Zm0-8.63a2.16 2.16 0 1 0 0-4.32h0v4.32Zm0-4.32a2.16 2.16 0 0 0-2.16-2.16v4.32h4.32V2.41h-2.16Zm-2.16-2.16a2.16 2.16 0 0 0-4.32 0v6.48h4.32V.25Z"></path></svg>;
}

function FigmaLogo() {
    return <svg role="img" aria-label="Figma logo" className="h-6 text-muted-foreground/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" fill="none"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-6 0a6 6 0 0 0-6 6v12a6 6 0 1 0 12 0V18a6 6 0 0 0-6-6Z"></path></svg>;
}

function StripeLogo() {
    return <svg role="img" aria-label="Stripe logo" className="h-6 text-muted-foreground/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 22" fill="none"><path fill="currentColor" d="M13.63 15.34c0-2.33 1.22-3.3 3.3-3.3 2.5 0 3.3 1.15 3.3 3.48v.5h-8.24c.06 1.48.9 2.1 2.1 2.1 1.05 0 1.8-.4 2.4-.9l1.6 1.2c-.8.8-2.2 1.3-4 1.3-3 0-5.5-2-5.5-5.58Zm5.05-4.43c-.4-.5-1.1-.8-2-.8s-1.6.3-2 .8h4Z M30.83 22V9.8h-1.8l-4.5 10.3h2l.7-2h5.5l.4 2h2Zm-3.8-3.7.8-2.3 1 2.3h-1.8Z M40.23 21.6h2L36.83 8h-2l-5.4 13.6h2l1.6-4h5.6l.6 4Zm-5.3-5.7 1.8-4.7 1.8 4.7h-3.6Z M12.83 8h-2L5.43 21.6h2l1.6-4h5.6l.6 4h2L12.83 8Zm-5.3 7.9 1.8-4.7 1.8 4.7h-3.6Z M.43 21.6V8h3.7c3 0 5 1.7 5 4.8 0 2-1.1 3.5-3 4.2l3.4 4.6h-2.3L4.43 17H2.43v4.6H.43Zm2-11.9v8.2h1.7c2 0 3-1.1 3-4.1s-1-4.1-3-4.1H2.43Z"></path></svg>;
}

function NotionLogo() {
    return <svg role="img" aria-label="Notion logo" className="h-6 text-muted-foreground/60" viewBox="0 0 88 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.3 2.7H2.8v19.6h9.5V2.7Zm-2.4 17.2H5.2v-2.3h4.7v2.3Zm0-4.7H5.2v-2.3h4.7v2.3Zm0-4.7H5.2V8h4.7v2.3Zm0-4.7H5.2V3.3h4.7V6ZM27.3 2.7l-7.7 13.5L27.2 2.7h10.4v19.6h-7.8V8.8l7.5 13.5h-9.9L19.8 8.8v13.5h-7.5V2.7h7.1l7.9 13.5L34.9 2.7h-7.6v0ZM52.4 2.7 44 14l-1.3-2.3-5.2-9H30v19.6h7.5V9.4l6.5 10.1 1.2 2.8h2.3l6.5-11.2V22.3H60V2.7h-7.6v0ZM72.6 2.7h-9.5v19.6h9.5v-2.3h-4.7v-4.8h4.7v-2.3h-4.7V5h4.7V2.7ZM88.2 2.7H78.7v19.6h9.5V2.7Zm-2.4 17.2h-4.7v-2.3h4.7v2.3Zm0-4.7h-4.7v-2.3h4.7v2.3Zm0-4.7h-4.7V8h4.7v2.3Zm0-4.7h-4.7V3.3h4.7V6Z"></path></svg>;
}

function VercelLogo() {
    return <svg role="img" aria-label="Vercel logo" className="h-5 text-muted-foreground/60" viewBox="0 0 128 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M63.88.62,127.76,25H0Z"></path></svg>;
}

function WebflowLogo() {
    return <svg role="img" aria-label="Webflow logo" className="h-6 text-muted-foreground/60" viewBox="0 0 102 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M8.33 0C3.73 0 0 3.73 0 8.33v10.51C0 23.41 3.7 28 8.28 28h10.96V16.32h-6.7c-.55 0-.9-.4-.84-.96l.66-5.83c.03-.3.3-.53.6-.53h6.29V0H8.33Zm21.2.5v11.8h8.84V.5H29.53Zm0 27.02V15.22h8.84v12.3h-8.84Z M44.62.5l11.83 11.23L68.28.5h7.24V27.5h-9.33V15.3l-5.6 5.8-5.6-5.8V27.5h-9.2V.5h6.05l.95.88.02-.02ZM84.7.5a13.75 13.75 0 0 0 0 27c7.6 0 13.75-6.17 13.75-13.5S92.3.5 84.7.5Zm0 18.25a4.5 4.5 0 1 1 0-9.01 4.5 4.5 0 0 1 0 9.01Z"></path></svg>;
}

function DropboxLogo() {
    return <svg role="img" aria-label="Dropbox logo" className="h-6 text-muted-foreground/60" viewBox="-10 -5 140 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m11.2 2.1-11.2 7 11.2 7 11.2-7-11.2-7Zm11.2 7v14l-11.2-7V9.1l11.2 7ZM0 9.1v7l11.2 7V16.1L0 9.1Zm11.2 21 11.2-7-11.2-7-11.2 7 11.2 7Zm33.6-21a8.3 8.3 0 0 0-8.4 8.3c0 4.6 3.8 8.3 8.4 8.3s8.4-3.7 8.4-8.3S50.4 2.1 44.8 2.1Zm0 13.3a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Zm15-13.3v16.6h3.2V5.4h5.2V2.1h-8.4Zm20.8 13.5a5.2 5.2 0 0 1-5.7 3.1 5.2 5.2 0 0 1-5.6-5.4c0-3.6 2.3-5.4 5.6-5.4 1.3 0 2.4.2 3.4.6l-.7 2.8c-.8-.3-1.6-.5-2.6-.5-1.5 0-2.3 1-2.3 2.5s.8 2.5 2.3 2.5c1.4 0 2.4-.4 3.4-1V12h-3.4V9.2h6.8v6.4ZM91.2 2.1l-4.5 16.6h3.4l1-3.6h5.2l1 3.6h3.4l-4.5-16.6h-5Zm.6 10.8 2-7.2 2 7.2h-4Zm28.1-10.8a8.3 8.3 0 0 0-8.4 8.3c0 4.6 3.8 8.3 8.4 8.3s8.4-3.7 8.4-8.3c0-4.6-3.8-8.3-8.4-8.3Zm0 13.3a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Z"></path></svg>;
}
