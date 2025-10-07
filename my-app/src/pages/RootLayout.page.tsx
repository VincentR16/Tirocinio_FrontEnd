import {
  AppShell,
  Burger,
  Button,
  Center,
  Flex,
  Group,
  Text,
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
import JsonModal from "../components/JsonModal";
import { CustomTitle } from "../components/CustomTitle";
import { IconLogout, IconX } from "@tabler/icons-react";
import { NotificationComponent } from "../components/Notification";

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
          <Flex pl="sm" p="sm" direction="row" gap="sm" w="100%" align="center">
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

            <NotificationComponent setSidebarActive={setSidebarActive} />
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
          title={
            <CustomTitle
              title="Logout"
              icon={<IconLogout size={24}></IconLogout>}
            ></CustomTitle>
          }
          withinPortal={false}
          closeButtonProps={{
            icon: <IconX size={20} color="red"></IconX>,
          }}
        >
          <Text ml={5}>Are you sure you want to logout?</Text>

          <Text fs="italic" fw={600} mt={5} ml={5}>
            This action cannot be undone.
          </Text>

          <Group mt={15}>
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
        <JsonModal></JsonModal>
      </AppShell>
    </>
  );
}
