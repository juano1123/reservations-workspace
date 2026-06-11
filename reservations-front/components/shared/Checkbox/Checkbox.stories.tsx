import Checkbox from "./Checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    value: true,
    label: "Checkbox",
  },
};

export const Unchecked: Story = {
  args: {
    value: false,
    label: "Checkbox",
  },
};

export const Disabled: Story = {
  args: {
    value: true,
    label: "Checkbox",
    disabled: true,
  },
};
