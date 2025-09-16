import {
  IconAuth2fa,
  IconHome2,
  IconLogout,
  IconPlus,
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
  sidebarActive: number;
  setSidebarActive: React.Dispatch<React.SetStateAction<number>>;
  onLogout: () => void;
};

const mockdata = [
  { icon: IconHome2, label: "Home", path: "/home" },
  { icon: IconPlus, label: "Add Ehr", path: "ehr/create" },
  { icon: IconUser, label: "Profile", path: "/home/profile" },
  { icon: IconAuth2fa, label: "Security", path: "/home/two-factor-auth" },
  { icon: IconSettings, label: "Settings", path: "/home" },
];

export function Sidebar({ onLogout, sidebarActive, setSidebarActive }: SidebarProps) {
  const navigate = useNavigate();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === sidebarActive}
      onClick={() => {
        setSidebarActive(index);
        navigate(link.path);
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
