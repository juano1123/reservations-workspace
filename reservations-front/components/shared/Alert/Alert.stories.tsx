import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta = {
  title: "Example/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    typeAlert: "primary",
    children: "Info",
    action: () => {},
  },
};

export const Success: Story = {
  args: {
    typeAlert: "success",
    children: "Success",
    action: () => {},
  },
};

export const Danger: Story = {
  args: {
    typeAlert: "danger",
    children: "Danger",
    action: () => {},
  },
};

export const Warning: Story = {
  args: {
    typeAlert: "warning",
    children: "Warning",
    action: () => {},
  },
};

export const Disabled: Story = {
  args: {
    typeAlert: "disabled",
    children: "White",
    action: () => {},
  },
};
