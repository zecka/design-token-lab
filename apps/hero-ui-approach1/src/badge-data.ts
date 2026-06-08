// Roles & variants mirror src/components/badge.html.
// Each role is registered as a HeroUI Chip *color* in index.css
// (@layer components), so badges are plain <Chip color="..." variant="...">.

export type Variant = "highlight" | "soft" | "outline";

// String passed to <Chip color>. "primary" reuses HeroUI's built-in
// `accent` (variant class `chip--primary` would otherwise clash);
// every other role is a custom color name defined in index.css.
export type ChipColor =
  | "accent"
  | "neutral"
  | "success"
  | "danger"
  | "morning"
  | "afternoon"
  | "evening"
  | "brand1"
  | "brand2"
  | "brand3";

// HeroUI Chip variant backing each visual variant.
export const HERO_VARIANT = {
  highlight: "primary", // filled
  soft: "soft", // tint
  outline: "secondary", // bordered
} as const;

export const VARIANTS: Variant[] = ["highlight", "soft", "outline"];

// Every role color, in display order — used for Storybook controls.
export const CHIP_COLORS: ChipColor[] = [
  "accent",
  "neutral",
  "success",
  "danger",
  "morning",
  "afternoon",
  "evening",
  "brand1",
  "brand2",
  "brand3",
];

export type RoleDef = { id: string; label: string; color: ChipColor };

export const ROLES: RoleDef[] = [
  { id: "primary", label: "Primary", color: "accent" },
  { id: "neutral", label: "Neutral", color: "neutral" },
  { id: "success", label: "Success", color: "success" },
  { id: "danger", label: "Danger", color: "danger" },
  { id: "morning", label: "Morning", color: "morning" },
  { id: "afternoon", label: "Afternoon", color: "afternoon" },
  { id: "evening", label: "Evening", color: "evening" },
];

export const BRAND_ROLES: RoleDef[] = [
  { id: "brand1", label: "Brand 1", color: "brand1" },
  { id: "brand2", label: "Brand 2", color: "brand2" },
  { id: "brand3", label: "Brand 3", color: "brand3" },
];

// "In Context" strip — same content as badge.html.
export const IN_CONTEXT: { color: ChipColor; variant: Variant; label: string }[] = [
  { color: "success", variant: "soft", label: "Confirmed" },
  { color: "danger", variant: "soft", label: "Cancelled" },
  { color: "accent", variant: "soft", label: "Premium" },
  { color: "neutral", variant: "soft", label: "Draft" },
  { color: "accent", variant: "highlight", label: "New" },
  { color: "morning", variant: "soft", label: "Morning Ritual" },
  { color: "afternoon", variant: "soft", label: "Afternoon Reset" },
  { color: "evening", variant: "soft", label: "Evening Wind-down" },
  { color: "neutral", variant: "outline", label: "Archived" },
  { color: "success", variant: "outline", label: "Verified" },
  { color: "evening", variant: "highlight", label: "Members Only" },
  { color: "brand1", variant: "highlight", label: "Brand" },
  { color: "brand2", variant: "highlight", label: "Brand" },
  { color: "brand3", variant: "highlight", label: "Brand" },
];
