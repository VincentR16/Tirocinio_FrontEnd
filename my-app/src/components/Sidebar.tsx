import {
  IconAuth2fa,
  IconHome2,
  IconLogout,
  IconPlus,
  IconHistory,
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
  { icon: IconHome2, label: "Home", path: "/MedTrust" },
  { icon: IconPlus, label: "Add Ehr", path: "create-Ehr" },
  { icon: IconHistory, label: "Comunication history", path: "comunication-history" },
  { icon: IconUser, label: "Profile", path: "profile" },
  { icon: IconAuth2fa, label: "Security", path: "two-factor-auth" },
];

export function Sidebar({
  onLogout,
  sidebarActive,
  setSidebarActive,
}: SidebarProps) {
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
