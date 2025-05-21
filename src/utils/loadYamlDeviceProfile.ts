import type { DeviceDefinition } from '../types/Device';
import yaml from 'js-yaml';
import fs from 'fs/promises';

/**
 * Loads a YAML device profile and converts it to a DeviceDefinition object.
 * Validates required fields.
 */
export async function loadDeviceProfile(filePath: string): Promise<DeviceDefinition> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parsedData = yaml.load(fileContent);

        if (!parsedData || typeof parsedData !== 'object') {
            throw new Error('Invalid YAML structure');
        }

        const { id, name, type, connection, capabilities } = parsedData as Record<string, unknown>;

        if (!id || !name || !type || !connection || !capabilities) {
            throw new Error('Missing required fields in device profile');
        }

        return {
            id: id as string,
            name: name as string,
            type: type as string,
            connection: connection as DeviceDefinition['connection'],
            capabilities: capabilities as DeviceDefinition['capabilities'],
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error loading device profile: ${error.message}`);
        } else {
            console.error('Unknown error loading device profile');
        }
        throw error;
    }
}
