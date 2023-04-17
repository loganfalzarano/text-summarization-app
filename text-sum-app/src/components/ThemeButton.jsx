import { Switch, Group, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function ThemeButton({colorScheme, changeTheme}) {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Switch
        size="md"
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
        onChange={(event) => {
            if (colorScheme === 'dark') {
                changeTheme('light');
            } else {
                changeTheme('dark');
            }
        }}
      />
    </Group>
  );
}

export default ThemeButton;