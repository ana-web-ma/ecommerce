import {
  Stack,
  Tab,
  Tabs,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import type { ReactElement } from 'react';
import { useState } from 'react';
import School from './rs_school_js.svg';
import Igor from './photos/igor.jpg';
import Vitaly from './photos/vitaly.jpg';
import Anastasia from './photos/anastasia.jpeg';
import './styles.css';

function Info(): ReactElement {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ): void => {
    setTabValue(newValue);
  };

  const teamMembers = [
    {
      name: 'Anastasia',
      photoUrl: Anastasia,
      bio: 'Краткая биография Насти...',
      tasks:
        "I have been leading our team all this time. First, I filled the Trello board with content to organise the project's tasks. This made it much easier for the developers to share responsibilities within the team. I also created a channel in Discord to communicate with our team. Here I organised a meeting with our students so that we could discuss the next steps, ask questions and solve problems together. So every student took part in discussing issues. Of course there were moments of hard work, but we always helped each other. I think I managed to help the team to organise the work and launch our project on time",
      profileUrl: 'https://github.com/Ana-Ma-Web',
    },
    {
      name: 'Vitaly',
      photoUrl: Vitaly,
      bio: 'Hello everyone! I am a developer from Belarus. I finished a couple of small online courses of web development before my study in RS School. So I have been studying and improving my skills for a year. I have many plans and goals. But the main one is to create inviting, easy to use applications for consumers. You can visit my GitHub. I have a few educational projects written in HTML + CSS and JS.',
      tasks:
        "Our team created an amazing responsive web application using React, Redux, React-router and MUI framework. This was a real challenge for us and I think we handled it well. We've gained experience and improved our skills in building single page application using React, which we will apply to our next projects. My specific skills and techniques on this project Firstly, it was my job to implement routing, navigation using React-router and create state management in our project using Redux. Then I created a login form and implemented client-side validation. I also had to render product data from API on a catalogue page. In this case I used MUI, created responsive catalogue page and made interactive product cards. In the next sprint I added an 'Add to Cart' button to send a request to the server, implemented pagination.",
      profileUrl: 'https://github.com/VitalyRK',
    },
    {
      name: 'Igor',
      photoUrl: Igor,
      bio: 'My name is Igor, and I was born on September 8,1991, in the city of Gomel, Republic of Belarus. I studied at the Belarusian State University of Transport to become a civil engineer. After completing my education, I started working in my field, and currently, I am employed as the Deputy Director of a construction company. I am currently taking a course in front-end development at RS SCHOOL.',
      tasks:
        'In the project, I worked on the user registration page, where I performed validation of various input fields, error handling on both the client and server sides, and user registration in the system. I also worked on the user profile page, where user data was retrieved to allow for the modification of both personal information and addresses, as well as password changes. Finally, I completed the "About Us" page with information about each team member and the "Main Page".',
      profileUrl: 'https://github.com/igorgromykojs',
    },
  ];

  return (
    <Stack
      mt={3}
      maxWidth={600}
      mx="auto"
      justifyContent="center"
      alignItems="center"
      textAlign={'justify'}
    >
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Anastasia" />
        <Tab label="Vitaly" />
        <Tab label="Igor" />
      </Tabs>
      <Stack mt={2} alignItems="center">
        <img
          src={teamMembers[tabValue].photoUrl}
          alt={`${teamMembers[tabValue].name} photo`}
          className="round-image"
        />
        <Divider variant="middle" />
        <Box mt={2}>
          <Typography variant="subtitle1">Biography</Typography>
          <Typography variant="body1">{teamMembers[tabValue].bio}</Typography>
        </Box>
        <Divider variant="middle" />
        <Box mt={2}>
          <Typography variant="subtitle1">
            Сontributions to the project
          </Typography>
          <Typography variant="body1">{teamMembers[tabValue].tasks}</Typography>
        </Box>
        <Divider variant="middle" />
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <a
            href={teamMembers[tabValue].profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="submit" variant="outlined">
              GitHub
            </Button>
          </a>
          <a href="https://rs.school">
            <svg width="100" height="36" xmlns="http://www.w3.org/2000/svg">
              <image href={School} width="100" height="36" />
            </svg>
          </a>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Info;
