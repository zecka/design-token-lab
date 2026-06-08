import type { Meta, StoryObj } from "@storybook/react-vite";
import { SaunaBoatPage } from "./SaunaBoatPage";

const meta = {
  title: "HeroUI/Pages/SaunaBoat",
  component: SaunaBoatPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-page composition for a Swiss luxury sauna boat brand. " +
          "Built with HeroUI v3 components (Button, Card, Separator, Link) " +
          "and Tailwind CSS utility classes, themed with the SaunaBoat wellness palette.",
      },
    },
  },
} satisfies Meta<typeof SaunaBoatPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
