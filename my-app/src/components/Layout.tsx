import { AppShell, Center, Flex } from "@mantine/core";
import { Shield } from "lucide-react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarToolTip } from "./NavbarToolTip";
import classes from "./style/Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="lg"
      header={{ height: 60}}
      navbar={{
        width: 80,
        breakpoint: "sm",
        collapsed: { desktop: !opened },
      }}
    >
      <AppShell.Header className={classes.header}>
        <Flex pl="sm" p="sm" direction="row" gap="sm">
          <Center>
            <Burger
              opened={opened}
              onClick={toggle}
              visibleFrom="sm"
              size="sm"
            ></Burger>
          </Center>

          <Center>
            <Shield></Shield>
            <h3 className={classes.title} style={{ display: "inline" }}>
              Med
            </h3>
            <h3
              className={classes.title}
              style={{ display: "inline", color: "rgb(29, 79, 217)" }}
            >
              Trust
            </h3>
          </Center>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarToolTip></NavbarToolTip>
      </AppShell.Navbar>
      <AppShell.Main><Outlet/></AppShell.Main>S
    </AppShell>
  );
}
