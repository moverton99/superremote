export interface DeviceCommand {
    label: string;
    category: string;
    method?: string;         // POST, GET, write, etc.
    path?: string;           // For HTTP
    headers?: Record<string, string>;
    body?: string;           // May include {{params}}
    characteristic_uuid?: string; // For Bluetooth
}

export interface DeviceQuery extends DeviceCommand { }
