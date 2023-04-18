import { MantineProvider, Grid, Title, Flex, Textarea, Select } from '@mantine/core';

import { ColorSchemeProvider } from '@mantine/core';
import { React, useState, useEffect } from 'react';
import ThemeButton from './components/ThemeButton';

export default function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const [value, setValue] = useState('');

  useEffect(() => {
    let ignore = false;
    
    if (!ignore) {
      navigator.clipboard.readText().then(text => {
        setValue(text);
      });
    }
    return () => { ignore = true; }
    },[]);

  


  return (
    <ColorSchemeProvider>
      <MantineProvider theme={{ colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
        {/* <ButtonToggle></ButtonToggle> */}
        {/* <SegmentedToggle></SegmentedToggle> */}
        <Flex justify="flex-end" style={{ padding: "10px" }}>
          <ThemeButton colorScheme={colorScheme} changeTheme={setColorScheme}></ThemeButton>
        </Flex>
        <Grid style={{ padding: 100 }}>
          <Grid.Col span="auto">
          </Grid.Col>
          <Grid.Col span={8}>
            <Title order={1} align="center">Text Summarization App</Title>
            <Textarea
              label="Enter what you want summarized"
              placeholder="Paste your text here"
              autosize
              minRows={4}
              maxRows={10}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              style={{ padding: "10px" }}
            />
            <Select
              label="Your favorite framework/library"
              placeholder="Pick one"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
              style={{ padding: "10px" }}
            />
            <Title order={2} align="center" style={{padding:"50px"}}>Insert More Feilds Here</Title>
            <Title order={2} align="center" style={{padding:"50px"}}>Display The Summary From Trained Model Here</Title>
          </Grid.Col>
          <Grid.Col span="auto">

          </Grid.Col>
        </Grid>

      </MantineProvider>
    </ColorSchemeProvider>

  );
}