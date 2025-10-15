import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import {
  BarChart3,
  PlayCircle,
  Search,
  Network,
  Info,
  Code,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    id: 0,
    title: 'Sorting Comparison',
    icon: BarChart3,
    description: 'Compare algorithm performance',
    color: '#6366f1',
  },
  {
    id: 1,
    title: 'Sorting Visualization',
    icon: PlayCircle,
    description: 'Watch algorithms in action',
    color: '#ec4899',
  },
  {
    id: 2,
    title: 'Search Visualization',
    icon: Search,
    description: 'Explore search algorithms',
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Graph Algorithms',
    icon: Network,
    description: 'Visualize graph traversals',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'About',
    icon: Info,
    description: 'Learn about this project',
    color: '#8b5cf6',
  },
];

const Sidebar = ({ activeTab, onTabChange, isCollapsed, onToggle }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        width: isCollapsed ? 80 : 280,
        height: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderRight: `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            <Code size={20} />
          </Box>
          {!isCollapsed && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                AlgoViz
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Algorithm Visualizer
              </Typography>
            </Box>
          )}
        </motion.div>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ px: 0 }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => onTabChange(item.id)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      py: 1.5,
                      px: 2,
                      background: isActive
                        ? `linear-gradient(135deg, ${item.color}15 0%, ${item.color}25 100%)`
                        : 'transparent',
                      border: isActive ? `1px solid ${item.color}30` : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isActive
                          ? `linear-gradient(135deg, ${item.color}20 0%, ${item.color}30 100%)`
                          : `linear-gradient(135deg, ${item.color}10 0%, ${item.color}20 100%)`,
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? item.color : theme.palette.text.secondary,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <Icon size={20} />
                    </ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: isActive ? 600 : 500,
                              color: isActive ? item.color : theme.palette.text.primary,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {item.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.75rem',
                            }}
                          >
                            {item.description}
                          </Typography>
                        }
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
              border: `1px solid ${theme.palette.primary.main}20`,
            }}
          >
            <Zap size={16} color={theme.palette.primary.main} />
            {!isCollapsed && (
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Interactive Learning
              </Typography>
            )}
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Sidebar;
