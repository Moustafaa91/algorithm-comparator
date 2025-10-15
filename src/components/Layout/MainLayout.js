import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, CssBaseline, ThemeProvider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Sidebar from './Sidebar';
import { lightTheme, darkTheme } from '../../theme/theme';

const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          background: isDarkMode
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Sidebar */}
        {!isMobile && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={onTabChange}
            isCollapsed={!isSidebarOpen}
            onToggle={handleToggleSidebar}
          />
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1200,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={handleToggleSidebar}
          />
        )}

        {isMobile && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: isSidebarOpen ? 0 : -280,
              width: 280,
              height: '100vh',
              zIndex: 1300,
              transition: 'left 0.3s ease',
            }}
          >
            <Sidebar
              activeTab={activeTab}
              onTabChange={onTabChange}
              isCollapsed={false}
              onToggle={handleToggleSidebar}
            />
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: { xs: 0, md: isSidebarOpen ? '280px' : '80px' },
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh',
          }}
        >
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
            isMobile={isMobile}
          />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 8, // Account for fixed header
              px: { xs: 2, sm: 3, md: 4 },
              pb: 4,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ width: '100%' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#1e293b' : '#ffffff',
              color: isDarkMode ? '#f1f5f9' : '#1e293b',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '12px',
              boxShadow: isDarkMode 
                ? '0 10px 25px rgba(0, 0, 0, 0.3)'
                : '0 10px 25px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
