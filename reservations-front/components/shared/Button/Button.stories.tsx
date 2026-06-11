import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    typeButton: "primary",
    children: "Button",
  },
};

export const Success: Story = {
  args: {
    typeButton: "success",
    children: "Button",
  },
};

export const Danger: Story = {
  args: {
    typeButton: "danger",
    children: "Button",
  },
};

export const Warning: Story = {
  args: {
    typeButton: "warning",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    typeButton: "disabled",
    children: "Button",
  },
};
