import React, { useEffect, useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import {
    ListItemButton,
    ListItemText,
    Skeleton,
    Typography,
    Box,
} from '@mui/material';

interface Device {
    id: string;
    name: string;
}

const mockDevices: Device[] = [
    { id: 'tv.livingroom', name: 'Living Room TV' },
    { id: 'receiver.main', name: 'Main Receiver' },
    { id: 'roku.1', name: 'Roku Streaming Stick' },
];

export function HomePage() {
    const [devices, setDevices] = useState<Device[] | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDevices(mockDevices);
        }, 1500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const drawerItems = devices
        ? devices.map((device) => (
            <ListItemButton
                key={device.id}
                selected={device.id === selectedId}
                onClick={() => setSelectedId(device.id)}
            >
                <ListItemText primary={device.name} />
            </ListItemButton>
        ))
        : new Array(3).fill(null).map((_, i) => (
            <Box key={i} sx={{ px: 2, py: 1 }}>
                <Skeleton variant="text" width="80%" />
            </Box>
        ));

    const selectedDevice = devices?.find((d) => d.id === selectedId);

    return (
        <AppLayout drawerItems={drawerItems}>
            {devices === null ? (
                <Box>
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
            ) : selectedDevice ? (
                <>
                    <Typography variant="h5">{selectedDevice.name}</Typography>
                    <Typography variant="body2">ID: {selectedDevice.id}</Typography>
                </>
            ) : (
                <Typography>Select a device from the sidebar.</Typography>
            )}
        </AppLayout>
    );
}
