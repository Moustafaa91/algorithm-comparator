import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Code,
  BarChart3,
  Play,
  Network,
  Search,
  Github,
  ExternalLink,
  Star,
  Users,
  Zap,
  Target,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Performance Comparison',
      description: 'Compare sorting algorithms complexity with performance metrics and charts.',
      color: '#6366f1',
    },
    {
      icon: Play,
      title: 'Step-by-Step Visualization',
      description: 'Watch sorting algorithms work with a step-by-step animations.',
      color: '#ec4899',
    },
    {
      icon: Search,
      title: 'Search Algorithms',
      description: 'Watch linear search, binary search, and other search algorithms step-by-step.',
      color: '#10b981',
    },
    {
      icon: Network,
      title: 'Graph Algorithms',
      description: 'Visualize BFS, DFS, and Dijkstra algorithms.',
      color: '#f59e0b',
    },
  ];

  const algorithms = [
    { name: 'Bubble Sort', complexity: 'O(n²)', category: 'Sorting' },
    { name: 'Quick Sort', complexity: 'O(n log n)', category: 'Sorting' },
    { name: 'Merge Sort', complexity: 'O(n log n)', category: 'Sorting' },
    { name: 'Binary Search', complexity: 'O(log n)', category: 'Search' },
    { name: 'BFS', complexity: 'O(V + E)', category: 'Graph' },
    { name: 'DFS', complexity: 'O(V + E)', category: 'Graph' },
    { name: 'Dijkstra', complexity: 'O((V + E) log V)', category: 'Graph' },
  ];

  const stats = [
    { icon: Code, label: 'Algorithms', value: '15+', color: '#6366f1' },
    { icon: Users, label: 'Users', value: '1K+', color: '#10b981' },
    { icon: Star, label: 'GitHub Stars', value: '500+', color: '#f59e0b' },
    { icon: Zap, label: 'Visualizations', value: '100+', color: '#ec4899' },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            mb: 6,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)',
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          />
          <CardContent sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 8 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Code size={40} />
              </Avatar>
            </motion.div>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Algorithm Visualizer
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}>
              Interactive platform for learning and understanding algorithms through beautiful visualizations
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Github size={20} />}
                href="https://github.com/Moustafaa91/algorithm-comparator"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                View on GitHub
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
  return (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={24} color="white" />
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>

      {/* Algorithms Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card sx={{ mb: 6 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Target size={32} color="#6366f1" />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Supported Algorithms
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {algorithms.map((algorithm, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      border: '1px solid rgba(99, 102, 241, 0.1)',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {algorithm.name}
                      </Typography>
                      <Chip
                        label={algorithm.complexity}
                        size="small"
                        sx={{
                          background: '#6366f1',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {algorithm.category}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card sx={{ mb: 6 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Award size={32} color="#6366f1" />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Technology Stack
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Frontend
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#61dafb' }} />
                    </ListItemIcon>
                    <ListItemText primary="React 18" secondary="Modern React with hooks and functional components" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText primary="Material-UI" secondary="Beautiful and accessible React components" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }} />
                    </ListItemIcon>
                    <ListItemText primary="Framer Motion" secondary="Smooth animations and transitions" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Visualization
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#82ca9d' }} />
                    </ListItemIcon>
                    <ListItemText primary="Recharts" secondary="Composable charting library" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#8884d8' }} />
                    </ListItemIcon>
                    <ListItemText primary="React Flow" secondary="Interactive node-based graphs" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ffc658' }} />
                    </ListItemIcon>
                    <ListItemText primary="Custom CSS" secondary="Tailored animations and styling" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default About;
