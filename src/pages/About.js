import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Link
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import aboutMeImage from '../pages/about_me.jpg';

const currentYear = new Date().getFullYear();
const me = {
    imageUrl: aboutMeImage,
    name: 'Moustafa Attia',
    description: `A Software engineer .Net/C# with over ${currentYear - 2015} years of experience in software development using various technologies and frameworks in both backend and frontend such as Node JS, React, SQL Server, Git, Azure services and CI/CD.`,
    linkedinUrl: 'https://www.linkedin.com/in/mustafa1090',
    githubUrl: 'https://github.com/Moustafaa91/algorithm-comparator'
};

const About = () => {
  return (
    <Card sx={{  boxShadow: 20, maxWidth: 345, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="300"
        image={me.imageUrl}
        alt={`${me.name}'s picture`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {me.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {me.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={me.linkedinUrl} target="_blank" rel="noopener">
          <IconButton aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link href={me.githubUrl} target="_blank" rel="noopener">
          <IconButton aria-label="GitHub">
          <GitHubIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default About;