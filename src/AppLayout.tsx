// src/ui/layout/AppLayout.tsx

import React from 'react';
import type { ReactNode, FC } from 'react';

import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    ListItemButton,
    ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

interface AppLayoutProps {
    drawerItems?: ReactNode[];
    children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ drawerItems, children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onDiscover = () => {
        console.log('Discover button clicked');
    };

    const drawer = (
        <div role="navigation" aria-label="Device Navigation">
            <Toolbar>
                <Typography variant="h6">Devices</Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItemButton onClick={onDiscover} sx={{ bgcolor: 'action.hover', mb: 1 }}>
                    <ListItemText primary="Discover..." />
                </ListItemButton>
                {drawerItems}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        aria-controls="device-drawer"
                        aria-expanded={mobileOpen}
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        SuperRemote Control
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Device Navigation"
            >
                {isSmallScreen ? (
                    <Drawer
                        id="device-drawer"
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                ) : (
                    <Drawer
                        id="device-drawer"
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
