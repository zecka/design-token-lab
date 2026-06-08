import type { Preview, Decorator } from "@storybook/react-vite";
import "../src/index.css";

// Wrap every story in the Swiss Luxury Wellness theme. CSS variables are
// scoped to [data-theme="wellness"], so descendants inherit the palette.
const withTheme: Decorator = (Story) => (
  <div data-theme="wellness" className="light bg-background text-foreground p-8">
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
};

export default preview;
