import { Chip } from "@heroui/react";
import { HERO_VARIANT, type ChipColor, type Variant } from "./badge-data";

export interface BadgeProps {
  /** Semantic role color — registered as a HeroUI `chip--{color}` class. */
  color: ChipColor;
  /** Visual emphasis. */
  variant?: Variant;
  label: string;
  disabled?: boolean;
}

/**
 * Badge = HeroUI <Chip>.
 *
 * HeroUI whitelists the Chip `color` prop to 5 values, so custom roles
 * (morning, brand1, …) can't go through it. Instead we hand HeroUI its
 * own BEM color class `chip--{color}`, styled per variant in index.css.
 */
export function Badge({ color, variant = "soft", label, disabled }: BadgeProps) {
  return (
    <Chip
      size="sm"
      variant={HERO_VARIANT[variant]}
      className={`chip--${color}${disabled ? " opacity-50 saturate-50" : ""}`}
    >
      {label}
    </Chip>
  );
}
