# SuperRemote Architecture

This document provides a deeper technical overview of SuperRemote’s architecture and the rationale behind key design decisions. It is intended for contributors and tools like GitHub Copilot Agent to understand how to work within the system.

---

## 🧱 Core Concepts

### 1. Device Abstraction

All controllable devices implement the `Device` base class, which defines:

- `connect()`: Establish a session (if required)
- `disconnect()`: Clean up connections
- `sendCommand(commandId, params)`: Executes a capability defined in the device's profile

This allows any device—Bluetooth, HTTP, IR—to be handled uniformly from the app’s perspective.

---

### 2. Capability Profiles (YAML)

Device capabilities are defined declaratively in YAML files, located in `src/data/devices/`. Each file contains:

- Device metadata (id, name, model)
- List of supported commands
- Parameters and default values

We support **inheritance** in YAML so common behaviors can be shared across device families.

> Example: All Yamaha receivers using YNCA can inherit from a base `ynca.yml` definition.

---

### 3. Device Registry

The registry:
- Tracks added devices
- Persists to `localStorage` (or later, IndexedDB)
- Supports import/export via JSON

This enables offline-first, per-device configuration with simple shareability (email, airdrop, etc.).

---

### 4. Adapters

Each device protocol gets its own adapter module:

```
src/adapters/
├── bluetooth/   # e.g., BLE device wrappers
├── http/        # REST or websocket controllers
├── ir/          # Network-controlled IR blaster support
```

Adapters are responsible for implementing the `Device` interface and calling platform-specific APIs (possibly via Capacitor plugins).

---

### 5. UI Layer

Material UI is used to construct:
- A sidebar with device navigation
- A main view for control panels or editor
- Dynamic rendering of control widgets based on the active device’s profile

Hooks like `useDeviceRegistry()` provide state access and updates.

---

## 🔌 Future Enhancements

- Command macros: multi-step commands grouped into user-defined actions
- Control panel editor: drag-and-drop UI builder based on device capabilities
- Native plugin bridge for background services (e.g., Bluetooth scan)
- YAML schema validation and tooling

---

## 🤝 Contribution Guidelines

- Follow the folder layout described in `README.md`
- Place new device adapters in their protocol folder
- Keep UI components focused and reusable
- Submit PRs with a brief summary and test steps

