import { AppShell, Button, Center, Flex, Group, Modal } from "@mantine/core";
import { Shield } from "lucide-react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./Sidebar";
import classes from "./style/Layout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/LogoutApi";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const [openedModal, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const onLogout = () => {
    close();
    try {
      logoutApi();
      console.log("logout success");
    } catch (err) {
      console.log("Error", err);
    }

    navigate("/welcome");
  };

  return (
    <AppShell
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
        <Sidebar onLogout={open}></Sidebar>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <Modal
        opened={openedModal}
        onClose={close}
        title="Logout"
        withinPortal={false}
      >
        Are you sure you want to logout? This action cannot be undone.
        <Group mt={10}>
          <Button variant="default" onClick={onLogout}>
            Confirm
          </Button>
          <Button color="red" onClick={close}>
            Cancell
          </Button>
        </Group>
      </Modal>
    </AppShell>
  );
}
