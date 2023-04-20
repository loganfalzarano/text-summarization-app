import axios from 'axios';
import { MantineProvider, Grid, Title, Flex, Textarea, Select, Button, Text, Card, Divider, Space } from '@mantine/core';
import { ColorSchemeProvider } from '@mantine/core';
import { React, useState, useEffect } from 'react';
import ThemeButton from './components/ThemeButton';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-yjieycH8HCAB02QhNdBXbaYL",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);


export default function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const [value, setValue] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      navigator.clipboard.readText().then(text => {
        setValue(text);
      });
    }
    return () => { ignore = true; }
  }, []);

  const getSummary = async () => {
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Summarize the following text: ${value}`,
    //   temperature: 0,
    //   max_tokens: 64,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // });
    // console.log(response);
    // setSummary(response.data.choices[0].text);

    const response = await openai.listModels();
    setSummary(JSON.stringify(response.data.data));
    console.log(response.data.data);
  }

  return (
    <ColorSchemeProvider>
      <MantineProvider theme={{ colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
        {/* <ButtonToggle></ButtonToggle> */}
        {/* <SegmentedToggle></SegmentedToggle> */}
        <Flex justify="flex-end" style={{ padding: "10px" }}>
          <ThemeButton colorScheme={colorScheme} changeTheme={setColorScheme}></ThemeButton>
        </Flex>
        <Grid style={{ padding: 10 }}>
          <Grid.Col span="auto">
          </Grid.Col>
          <Grid.Col span={8}>
            <Title order={1} align="center" style={{padding:"10px"}}>Text Summarization App</Title>
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
            <Title order={2} align="center" style={{ padding: "50px" }}>Insert More Fields Here</Title>
            <Title order={2} align="center" style={{ padding: "50px" }}>Display The Summary From Trained Model Here</Title>
            <Button variant="light" fullWidth style={{padding: "10px"}} onClick={() => {getSummary()}}>
              Get Summary
            </Button>
            <Space style={{padding: "10px"}} />
            <Divider style={{padding: "10px"}} />
            <Card withBorder style={{overflowWrap: "break-word", hyphens: "manual", padding:"10px"}} >
              {summary}
            </Card>
            
          </Grid.Col>
          <Grid.Col span="auto">

          </Grid.Col>
        </Grid>

      </MantineProvider>
    </ColorSchemeProvider>

  );
}