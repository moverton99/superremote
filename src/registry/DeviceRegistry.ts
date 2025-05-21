// src/registry/DeviceRegistry.ts

import type { DeviceDefinition } from '../types/Device';

export class DeviceRegistry {
  private static STORAGE_KEY = 'superremote.devices';
  private devices: Map<string, DeviceDefinition> = new Map();

  constructor() {
    this.load();
  }

  add(device: DeviceDefinition): void {
    this.devices.set(device.id, device);
    this.save();
  }

  remove(deviceId: string): void {
    this.devices.delete(deviceId);
    this.save();
  }

  getAll(): DeviceDefinition[] {
    return Array.from(this.devices.values());
  }

  export(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  import(json: string): void {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        parsed.forEach((d) => this.devices.set(d.id, d));
        this.save();
      }
    } catch (err) {
      console.error('Import failed:', err);
    }
  }

  private save(): void {
    localStorage.setItem(DeviceRegistry.STORAGE_KEY, this.export());
  }

  private load(): void {
    const stored = localStorage.getItem(DeviceRegistry.STORAGE_KEY);
    if (stored) {
      try {
        const parsed: DeviceDefinition[] = JSON.parse(stored);
        parsed.forEach((d) => this.devices.set(d.id, d));
      } catch (err) {
        console.warn('Failed to parse device registry:', err);
      }
    }
  }
}
