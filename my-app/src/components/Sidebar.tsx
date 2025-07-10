import { useState } from "react";
import {
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./style/NavbarToolTip.module.css";
import { useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

type SidebarProps = {
  onLogout: () => void;
};

const mockdata = [
  { icon: IconHome2, label: "Home",path: "/home"},
  { icon: IconGauge, label: "Dashboard",path: "/home"},
  { icon: IconUser, label: "Profile",path: "/home/profile" },
  { icon: IconFingerprint, label: "Security",path: "/home"},
  { icon: IconSettings, label: "Settings",path: "/home"},
];

export function Sidebar({onLogout}:SidebarProps) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate()

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.path)
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
        <Stack justify="center" mt={375} gap={0}>
          <NavbarLink onClick={onLogout} icon={IconLogout} label="Logout" />
        </Stack>
      </div>
    </nav>
  );
}
