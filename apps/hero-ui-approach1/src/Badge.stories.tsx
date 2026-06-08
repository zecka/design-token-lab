import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import {
  ROLES,
  BRAND_ROLES,
  VARIANTS,
  CHIP_COLORS,
  IN_CONTEXT,
} from "./badge-data";

const ALL_ROLES = [...ROLES, ...BRAND_ROLES];

const meta = {
  title: "HeroUI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    color: "accent",
    variant: "soft",
    label: "Badge",
    disabled: false,
  },
  argTypes: {
    color: { control: "select", options: CHIP_COLORS },
    variant: { control: "inline-radio", options: VARIANTS },
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Badge is a HeroUI `<Chip>`. Custom roles (morning, evening, brand1…) " +
          "are applied through HeroUI's own `chip--{color}` BEM class, themed " +
          "in `index.css` for the Swiss Luxury Wellness palette.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive — tweak color, variant, label and disabled in Controls. */
export const Playground: Story = {};

/** Full matrix: every role across highlight / soft / outline. */
export const AllRolesAndVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-[7rem_repeat(3,1fr)] items-center gap-x-6 gap-y-4">
      <Head>Role</Head>
      <Head>Highlight</Head>
      <Head>Soft</Head>
      <Head>Outline</Head>

      {ROLES.map((r) => (
        <RoleRow key={r.id} id={r.id} label={r.label} color={r.color} />
      ))}

      <div className="col-span-4 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
        Brand colors
      </div>

      {BRAND_ROLES.map((r) => (
        <RoleRow key={r.id} id={r.id} label={r.label} color={r.color} />
      ))}
    </div>
  ),
};

/** Disabled treatment across every role and variant. */
export const DisabledState: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2.5">
          <span className="w-20 shrink-0 text-sm text-muted">{variant}</span>
          {ALL_ROLES.map((r) => (
            <Badge
              key={r.id}
              color={r.color}
              variant={variant}
              label={r.label}
              disabled
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Realistic usage — statuses, rituals and brand tags side by side. */
export const InContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2.5">
      {IN_CONTEXT.map((b, i) => (
        <Badge key={i} color={b.color} variant={b.variant} label={b.label} />
      ))}
    </div>
  ),
};

function Head({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-wider text-muted">
      {children}
    </div>
  );
}

function RoleRow({
  id,
  label,
  color,
}: {
  id: string;
  label: string;
  color: (typeof CHIP_COLORS)[number];
}) {
  return (
    <>
      <div className="text-sm text-foreground">{id}</div>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <Badge color={color} variant={variant} label={label} />
        </div>
      ))}
    </>
  );
}
