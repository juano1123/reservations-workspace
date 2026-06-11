import DarkModeButton from "./DarkModeButton";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/DarkModeButton",
  component: DarkModeButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DarkModeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
