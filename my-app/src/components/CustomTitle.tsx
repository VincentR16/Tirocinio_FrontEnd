import { ThemeIcon, Title, Group } from "@mantine/core";
import type { ReactNode } from "react";

type CustomTitleProps = {
  title: string;
  icon: ReactNode;
};

export const CustomTitle = ({ title, icon }: CustomTitleProps) => (
  <Group>
    <ThemeIcon
      ml={10}
      size="lg"
      radius="md"
      variant="gradient"
      gradient={{ from: "blue", to: "cyan" }}
    >
      {icon}
    </ThemeIcon>
    <Title
      order={3}
      style={{
        background: "linear-gradient(135deg, #228be6 0%, #15aabf 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 600,
      }}
    >
      {title}
    </Title>
  </Group>
);
