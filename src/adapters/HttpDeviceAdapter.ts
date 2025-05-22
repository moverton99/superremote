// src/adapters/http/HttpDeviceAdapter.ts

import type { DeviceAdapter } from '../types/DeviceAdapter';
import type { DeviceCommand, DeviceQuery } from '../types/DeviceProtocol';
import Mustache from 'mustache';

export class HttpDeviceAdapter implements DeviceAdapter {
  private baseUrl: string;
  private defaults: Record<string, any>;

  constructor(baseUrl: string, defaults: Record<string, any>) {
    this.baseUrl = baseUrl;
    this.defaults = defaults;
  }

  async sendCommand(command: DeviceCommand, params?: Record<string, any>): Promise<void> {
    const url = this.resolveUrl(command.path ?? '');
    const method = command.method || this.defaults.method || 'POST';
    const headers = command.headers || this.defaults.headers || {};
    const body = this.renderBody(command.body, params);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP command failed: ${response.status}`);
    }
  }

  async sendQuery(query: DeviceQuery, params?: Record<string, any>): Promise<any> {
    const url = this.resolveUrl(query.path ?? '');
    const method = query.method || this.defaults.method || 'POST';
    const headers = query.headers || this.defaults.headers || {};
    const body = this.renderBody(query.body, params);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP query failed: ${response.status}`);
    }

    return response.text(); // or parse XML/JSON depending on device
  }

  private resolveUrl(path: string): string {
    return this.baseUrl.endsWith('/')
      ? this.baseUrl + path.replace(/^\//, '')
      : this.baseUrl + path;
  }

  private renderBody(template: string | undefined, params?: Record<string, any>): string | undefined {
    if (!template) return undefined;
    return Mustache.render(template, params || {});
  }
}
