import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
} from '@mui/material';

const categories = ['Receivers', 'TVs']; // Simulated categories
const manufacturers: Record<string, string[]> = {
    Receivers: ['Yamaha'],
    TVs: [],
};
const models: Record<string, string[]> = {
    Yamaha: ['YamahaYNCA', 'yamaha.rx-a2a'],
};

export const DiscoverDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Fixed event type compatibility for Material-UI Select components
    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value);
        setSelectedManufacturer('');
        setSelectedModel('');
    };

    const handleManufacturerChange = (event: any) => {
        setSelectedManufacturer(event.target.value);
        setSelectedModel('');
    };

    const handleModelChange = (event: any) => {
        setSelectedModel(event.target.value);
    };

    const handleDiscover = () => {
        alert(`Selected Model: ${selectedModel}`);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Discover Devices</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel shrink={true}>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
                        <InputLabel shrink={true}>Manufacturer</InputLabel>
                        <Select
                            value={selectedManufacturer}
                            onChange={handleManufacturerChange}
                        >
                            {(manufacturers[selectedCategory] || []).map((manufacturer: string) => (
                                <MenuItem key={manufacturer} value={manufacturer}>
                                    {manufacturer}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" disabled={!selectedManufacturer}>
                        <InputLabel shrink={true}>Model</InputLabel>
                        <Select
                            value={selectedModel}
                            onChange={handleModelChange}
                        >
                            {(models[selectedManufacturer] || []).map((model: string) => (
                                <MenuItem key={model} value={model}>
                                    {model}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleDiscover}
                    disabled={!selectedModel}
                    variant="contained"
                >
                    Discover
                </Button>
            </DialogActions>
        </Dialog>
    );
};
