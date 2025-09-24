import {
  AppShell,
  Burger,
  Button,
  Center,
  Flex,
  Group,
  Modal,
} from "@mantine/core";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Shield } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import useLogout from "../hook/useLogout";
import classes from "./style/layout.module.css";
import { useState } from "react";
import SendModal from "../components/SendModal";

export type SidebarContext = {
  sidebarActive: number;
  setSidebarActive: React.Dispatch<React.SetStateAction<number>>;
};

export default function RootLayout() {
  const [opened, { toggle }] = useDisclosure(true);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [sidebarActive, setSidebarActive] = useState(0);
  const logout = useLogout();

  return (
    <>
      <AppShell
        className={classes.container}
        padding="lg"
        header={{ height: 60 }}
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
          <Sidebar
            onLogout={open}
            sidebarActive={sidebarActive}
            setSidebarActive={setSidebarActive}
          ></Sidebar>
        </AppShell.Navbar>

        <AppShell.Main className={classes.container}>
          <Outlet
            context={
              { sidebarActive, setSidebarActive } satisfies SidebarContext
            }
          />
        </AppShell.Main>

        <Modal
          opened={openedModal}
          onClose={close}
          title="Logout"
          withinPortal={false}
        >
          Are you sure you want to logout? This action cannot be undone.
          <Group mt={10}>
            <Button
              variant="default"
              onClick={() => {
                logout.mutate();
                close();
              }}
            >
              Confirm
            </Button>
            <Button color="red" onClick={close}>
              Cancell
            </Button>
          </Group>
        </Modal>
        <SendModal></SendModal>
      </AppShell>
    </>
  );
}
