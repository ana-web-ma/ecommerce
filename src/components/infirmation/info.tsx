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
import './styles.css';

function Info(): ReactElement {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ): void => {
    setTabValue(newValue);
  };

  // Создайте массив объектов с информацией о каждом участнике проекта
  const teamMembers = [
    {
      name: 'Anastasia',
      photoUrl: 'photos/vegy.jpg',
      bio: 'Краткая биография Насти...',
      tasks: 'Задачи, выполняемые Настей...',
      profileUrl: 'ссылка на профиль Насти',
    },
    {
      name: 'Vitaly',
      photoUrl: '/vegy.jpg',
      bio: 'Hello everyone! I am a developer from Belarus. I finished a couple of small online courses of web development before my study in RS School. So I have been studying and improving my skills for a year. I have many plans and goals. But the main one is to create inviting, easy to use applications for consumers. You can visit my GitHub. I have a few educational projects written in HTML + CSS and JS.',
      tasks: 'Задачи, выполняемые Виталиком...',
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
