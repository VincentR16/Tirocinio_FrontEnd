import { Box, Code, Modal,  } from "@mantine/core";
import { IconJson, IconX } from "@tabler/icons-react";
import { useJsonContext } from "../context/JsonContext";
import { CustomTitle } from "./CustomTitle";

export default function JsonModal() {
  const { opened, json, closeModal, setJson } = useJsonContext();

  return (
    <Modal
      opened={opened}
      onClose={() => {
        closeModal();
        setJson(undefined);
      }}
      title={
        <CustomTitle
          title="Response"
          icon={<IconJson size={24}></IconJson>}
        ></CustomTitle>
      }
      centered
      size="xl"
      closeButtonProps={{
        icon: <IconX size={20} color="red"></IconX>,
      }}
      withinPortal={false}
      radius="md"
    >
      <Box>
        <Code
          block
          style={{
            maxHeight: "500px",
            overflow: "auto",
            backgroundColor: "var(--mantine-color-gray-0)",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "0.875rem",
          }}
        >
          {JSON.stringify(json, null, 2)}
        </Code>
      </Box>
    </Modal>
  );
}
