// src/types/Device.ts

export type DeviceConnectionType = 'http' | 'bluetooth' | 'ir' | 'custom';

export interface DeviceCapability {
    id: string;
    name: string;
    params?: Record<string, unknown>;
}

export interface DeviceDefinition {
    id: string;
    name: string;
    manufacturer?: string;
    model?: string;
    type: string;
    connection: DeviceConnectionType;
    address?: string;
    capabilities: DeviceCapability[];
    metadata?: Record<string, unknown>;
}

export abstract class Device {
    readonly definition: DeviceDefinition;

    constructor(definition: DeviceDefinition) {
        this.definition = definition;
    }

    abstract connect(): Promise<boolean>;
    abstract disconnect(): Promise<void>;
    abstract sendCommand(commandId: string, params?: Record<string, unknown>): Promise<boolean>;
}
