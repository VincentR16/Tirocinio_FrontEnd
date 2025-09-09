import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput, type TextInputProps, useMantineTheme } from '@mantine/core';

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      style={{ width: '100%', maxWidth: '700px' }}
      radius="xl"
      size="md"
      placeholder="Search patient by name or email"
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}