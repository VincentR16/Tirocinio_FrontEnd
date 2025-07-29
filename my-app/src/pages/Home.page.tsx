import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { Plus } from "lucide-react";
import classes from "./style/home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Flex direction="column" align="center" className={classes.container}>
        <Tooltip label="Add EHR">
          <ActionIcon
            mb="xs"
            mr="md"
            variant="filled"
            size="xl"
            radius="md"
            aria-label="Add"
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
            onClick={() => navigate("ehr/create")}
          >
            <Plus style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </>
  );
}
