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
const manufacturers = {
    Receivers: ['Yamaha'],
    TVs: [],
};
const models = {
    Yamaha: ['YamahaYNCA', 'yamaha.rx-a2a'],
};

export const DiscoverDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as string);
        setSelectedManufacturer('');
        setSelectedModel('');
    };

    const handleManufacturerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedManufacturer(event.target.value as string);
        setSelectedModel('');
    };

    const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedModel(event.target.value as string);
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
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
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

                    <FormControl fullWidth disabled={!selectedCategory}>
                        <InputLabel>Manufacturer</InputLabel>
                        <Select
                            value={selectedManufacturer}
                            onChange={handleManufacturerChange}
                        >
                            {(manufacturers[selectedCategory] || []).map((manufacturer) => (
                                <MenuItem key={manufacturer} value={manufacturer}>
                                    {manufacturer}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth disabled={!selectedManufacturer}>
                        <InputLabel>Model</InputLabel>
                        <Select
                            value={selectedModel}
                            onChange={handleModelChange}
                        >
                            {(models[selectedManufacturer] || []).map((model) => (
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
