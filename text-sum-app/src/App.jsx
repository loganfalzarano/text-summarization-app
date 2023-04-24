import axios from 'axios';
import { MantineProvider, Grid, Title, Flex, Textarea, Select, Button, Text, Card, Divider, Space, Slider, Checkbox } from '@mantine/core';
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

const MARKS = [
  { value: 0, label: '0' },
  { value: 150, label: '150' },
  { value: 300, label: '300' },
  { value: 450, label: '450' },
];

export default function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const [value, setValue] = useState('');
  const [summary, setSummary] = useState('');
  const [style, setStyle] = useState('');
  const [level, setLevel] = useState('');
  const [length, setLength] = useState(300);
  const [checked, setChecked] = useState(false);

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
    const prompt = `Act as: Summarizer
    Degree of summarization: Determine the field and include what is relevant to it
    Change style to: ${style}
    Change tone to: Analytical
    Change reader comprehension level to: ${level}
    Change length to: ${length} Words
    ${checked ? "Then provide me with a series of quizzes or tests on [topic or skill] at varying difficulty levels to enhance my retention and understanding." : ""}
    Text: 
    
    ${value}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log(response);
    setSummary(response.data.choices[0].text);

    // const response = await openai.listModels();
    // setSummary(JSON.stringify(response.data.data));
    // console.log(response.data.data);
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
            <Title order={1} align="center" style={{ padding: "10px" }}>Text Summarization App</Title>
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
              label="Choose your desired tone for the summarization"
              placeholder="Pick one"
              data={[
                { value: 'academic', label: 'Academic' },
                { value: 'PhD Work', label: 'PhD Work' },
                { value: 'converstional', label: 'Converstional' },
              ]}
              style={{ padding: "10px" }}
              value={style}
              onChange={setStyle}
            />
            <Select
              label="Choose your desired level of reader comprehension for the summarization"
              placeholder="Pick one"
              data={[
                { label: 'Expert', value: 'expert, assume extensive prior knowledge on the field and on what is being presented' },
                { label: 'Experienced', value: 'experienced, assume extensive prior knowledge on the field, but minimal on what is being presented' },
                { label: 'Beginner', value: 'beginner, assume minimal prior knowledge on the field, and minimal on what is being presented' },
              ]}
              style={{ padding: "10px" }}
              value={level}
              onChange={setLevel}
            />
            <Text size={"sm"} style={{ padding: "10px" }}>Choose the length of the summary</Text>
            <Slider
              //style={{ paddingLeft: "18px" , paddingRight: "18px" , paddingBottom: "20px"}}
              style={{ marginLeft: "10px" , marginRight: "10px" , marginBottom: "20px"}}
              min={100}
              max={500}
              labelTransition="skew-down"
              labelTransitionDuration={150}
              labelTransitionTimingFunction="ease"
              value={length}
              onChange={setLength}
            />
            <Checkbox 
            label="Create a quiz on the content"
            style={{ paddingLeft: "10px" , paddingRight: "10px" , paddingBottom: "20px"}}
            checked={checked} 
            onChange={(event) => setChecked(event.currentTarget.checked)} 
            />
            <Space style={{ padding: "2px" }} />
            {/* <Title order={2} align="center" style={{ padding: "50px" }}>Insert More Fields Here</Title> */}
            {/* <Title order={2} align="center" style={{ padding: "50px" }}>Display The Summary From Trained Model Here</Title> */}
            <Button variant="light" fullWidth style={{ padding: "10px" }} onClick={() => { getSummary() }}>
              Get Summary
            </Button>
            <Space style={{ padding: "10px" }} />
            <Divider style={{ padding: "10px" }} />
            <Card withBorder style={{ overflowWrap: "break-word", hyphens: "manual", padding: "10px" }} >
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