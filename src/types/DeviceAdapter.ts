// src/types/DeviceAdapter.ts

import type { DeviceCommand, DeviceQuery } from './DeviceProtocol';

export interface DeviceAdapter {
  sendCommand(command: DeviceCommand, params?: Record<string, any>): Promise<void>;
  sendQuery(query: DeviceQuery, params?: Record<string, any>): Promise<any>;
  connect?(): Promise<void>;
  disconnect?(): void;
}
