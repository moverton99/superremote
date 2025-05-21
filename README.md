# SuperRemote

SuperRemote is a cross-platform, extensible universal remote control system built with React, Capacitor, and TypeScript. It is designed to support a wide range of devices such as AV receivers, TVs, set-top boxes, and streaming sticks through a modular, plugin-style architecture.

## 🎯 Project Goals

- Support real-world device control over protocols like HTTP, Bluetooth, IR (via network blasters), and more.
- Load device capabilities and command profiles from YAML definitions to simplify maintenance.
- Allow users to configure custom control panels and macros from a local device registry.
- Prioritize long-term maintainability and clarity over short-term shortcuts.

## 🧱 Architecture Overview

- **React + Material UI (Client)**: Provides the cross-platform UI via Capacitor.
- **Device Registry**: Manages discovery and local persistence of known devices.
- **Adapters**: Each protocol (HTTP, Bluetooth, IR) has its own adapter implementing a common `Device` interface.
- **YAML Profiles**: Define device capabilities and commands in a declarative format. Inheritance is supported to reduce duplication.
- **Local-Only Storage**: Device state and control configurations are stored per device (with export/import support).

## 📁 Folder Structure

```
src/
├── adapters/            # Device communication logic (e.g., bluetooth, http)
│   ├── bluetooth/
│   ├── http/
│   └── ir/
├── data/                # Device profiles in YAML format
│   ├── devices/
│   └── shared/
├── hooks/               # React hooks (e.g., useDeviceRegistry)
├── registry/            # DeviceRegistry class and helpers
├── types/               # Core types like Device, Capability, etc.
├── ui/                  # UI layout and components
│   ├── components/
│   ├── layout/
│   └── pages/
├── utils/               # General utilities
```

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
npx cap copy
```

### 4. Add Capacitor platforms (when ready)

```bash
npx cap add android
npx cap add ios
```

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Capacitor](https://capacitorjs.com/)
- TypeScript
- YAML for capability definitions

## 🤖 Developer Notes

- All devices extend the `Device` base class and implement `connect`, `disconnect`, and `sendCommand`.
- The `DeviceRegistry` supports in-browser persistence and JSON import/export.
- Profiles in `data/devices/*.yaml` define available commands and parameters per device model or family.

## 📂 Planned Extensions

- Auto-discovery plugins (mDNS, Bluetooth scan)
- Macro editor for custom command sequences
- Per-device dynamic control panel generation
