import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronUp, 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';
import { 
  Box, 
  Typography, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';

const sidebarVariants = {
  open: {
    width: "240px",
  },
  closed: {
    width: "64px",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        zIndex: 40,
        height: '100%',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white'
      }}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          {!isCollapsed && (
            <Typography variant="h6" fontWeight="bold">
              Meal Lovers
            </Typography>
          )}
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu size={20} />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, p: 1 }}>
          <ListItem 
            button 
            component={Link} 
            to="/dashboard"
            selected={pathname === "/dashboard"}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LayoutDashboard size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Dashboard" />}
          </ListItem>

          <ListItem 
            button 
            component={Link} 
            to="/products"
            selected={pathname === "/products"}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ShoppingBag size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Products" />}
          </ListItem>

          <ListItem 
            button 
            component={Link} 
            to="/orders"
            selected={pathname === "/orders"}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ShoppingBag size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Orders" />}
          </ListItem>

          <ListItem 
            button 
            component={Link} 
            to="/users"
            selected={pathname === "/users"}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Users size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Users" />}
          </ListItem>
        </List>

        <Box sx={{ p: 1, mt: 'auto' }}>
          <Divider sx={{ my: 1 }} />
          <ListItem 
            button 
            component={Link} 
            to="/settings"
            selected={pathname === "/settings"}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Settings size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Settings" />}
          </ListItem>

          <ListItem 
            button
            onClick={handleLogout}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogOut size={20} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Logout" />}
          </ListItem>
        </Box>
      </Box>
    </motion.div>
  );
} 