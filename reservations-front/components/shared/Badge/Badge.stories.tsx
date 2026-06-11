import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta = {
  title: "Example/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    typeBadge: "primary",
    children: "Badge",
  },
};

export const Success: Story = {
  args: {
    typeBadge: "success",
    children: "Badge",
  },
};

export const Danger: Story = {
  args: {
    typeBadge: "danger",
    children: "Badge",
  },
};

export const Warning: Story = {
  args: {
    typeBadge: "warning",
    children: "Badge",
  },
};

export const Disabled: Story = {
  args: {
    typeBadge: "disabled",
    children: "Badge",
  },
};
