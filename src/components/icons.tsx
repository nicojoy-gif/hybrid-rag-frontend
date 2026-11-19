import type { SVGProps } from "react";

export type IconName =
  | "sparkles"
  | "plus"
  | "book"
  | "history"
  | "settings"
  | "menu"
  | "close"
  | "chevron"
  | "arrow"
  | "send"
  | "paperclip"
  | "file"
  | "search"
  | "check"
  | "alert"
  | "upload"
  | "message"
  | "external";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  const shared = {
    "aria-hidden": true as const,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
    ...props,
  };

  switch (name) {
    case "sparkles":
      return <svg {...shared}><path d="m12 3 1.3 5.2L18 10l-4.7 1.8L12 17l-1.3-5.2L6 10l4.7-1.8L12 3Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 3l.6 2.4L8 6l-2.4.6L5 9l-.6-2.4L2 6l2.4-.6L5 3Z" /></svg>;
    case "plus":
      return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>;
    case "book":
      return <svg {...shared}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 6v15M8 7h8M8 11h7" /></svg>;
    case "history":
      return <svg {...shared}><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></svg>;
    case "settings":
      return <svg {...shared}><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1.1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1.1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1.1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1.1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1)" /></svg>;
    case "menu":
      return <svg {...shared}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
    case "close":
      return <svg {...shared}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "chevron":
      return <svg {...shared}><path d="m9 18 6-6-6-6" /></svg>;
    case "arrow":
      return <svg {...shared}><path d="M7 17 17 7M7 7h10v10" /></svg>;
    case "send":
      return <svg {...shared}><path d="m21 3-7.2 18-3.9-7.9L2 9.2 21 3Z" /><path d="M10 13 21 3" /></svg>;
    case "paperclip":
      return <svg {...shared}><path d="m8 12.5 6.6-6.6a3 3 0 0 1 4.2 4.2l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.5-8.5" /></svg>;
    case "file":
      return <svg {...shared}><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10Z" /><path d="M13 3v7h7M8 15h8M8 18h6" /></svg>;
    case "search":
      return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
    case "check":
      return <svg {...shared}><path d="m5 12 4 4L19 6" /></svg>;
    case "alert":
      return <svg {...shared}><path d="M12 3 2.8 19h18.4L12 3Z" /><path d="M12 9v4M12 16h.01" /></svg>;
    case "upload":
      return <svg {...shared}><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></svg>;
    case "message":
      return <svg {...shared}><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-1 2v-5.5a7.5 7.5 0 1 1 16-4Z" /><path d="M8 11h8M8 14h5" /></svg>;
    case "external":
      return <svg {...shared}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></svg>;
  }
}
