# React + Ionic + Capacitor Mobile App

A mobile-first application built with React, Ionic Framework, Capacitor, and Tailwind CSS, featuring camera preview, Bluetooth LE connectivity, and TensorFlow.js machine learning capabilities.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive UI
- 📷 **Camera Preview** - Real-time camera access and image capture
- 🔵 **Bluetooth LE** - Connect to IoT devices and sensors
- 🤖 **TensorFlow.js** - On-device machine learning
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- ⚡ **Vite** - Lightning-fast build tool
- 📦 **Capacitor** - Native mobile capabilities

## Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Framework**: Ionic Framework 8
- **Styling**: Tailwind CSS 4
- **Native Bridge**: Capacitor 7
- **Build Tool**: Vite 5
- **ML**: TensorFlow.js
- **Plugins**:
  - @capacitor-community/camera-preview
  - @capacitor-community/bluetooth-le

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Sync with Android platform
npm run android:sync
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
# Visit http://localhost:5173
```

### Android Development (Physical Device Recommended)

**Physical Android devices are strongly recommended** for testing Camera Preview and Bluetooth LE features, as these do not work properly in emulators.

```bash
# Connect your Android device via USB
# Enable USB Debugging in Developer Options

# Run on connected physical device
npm run android:run

# Or open in Android Studio
npm run android:open

# Build debug APK
npm run android:build
```

For detailed physical device setup instructions, see [ANDROID_SETUP.md](./ANDROID_SETUP.md)

## Project Structure

```
.
├── src/
│   ├── pages/          # Page components
│   │   └── Home.tsx    # Landing page with 4 feature cards
│   ├── components/     # Reusable components
│   ├── theme/          # Ionic theme customization
│   └── App.tsx         # Main app component
├── android/            # Android native project
├── public/             # Static assets
├── dist/               # Build output
└── capacitor.config.ts # Capacitor configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build web assets |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test.unit` | Run unit tests |
| `npm run test.e2e` | Run E2E tests |
| `npm run android:sync` | Build and sync to Android |
| `npm run android:run` | Run on connected device |
| `npm run android:open` | Open in Android Studio |
| `npm run android:build` | Build debug APK |
| `npm run android:release` | Build release APK |

## Landing Page

The app features a beautiful landing page with 4 vertically stacked cards:

1. **Camera Preview Card** - Real-time camera functionality
2. **Bluetooth LE Card** - IoT device connectivity
3. **TensorFlow AI Card** - Machine learning capabilities
4. **Mobile First Card** - Technology stack showcase

Each card is styled with Tailwind CSS and features:
- Gradient backgrounds
- Icon badges
- Feature tags
- Smooth hover animations
- Mobile-optimized layout

## Plugins Configuration

### Camera Preview

✅ **Requires physical device** - Emulator camera support is limited

Required permissions (already configured in AndroidManifest.xml):
- `android.permission.CAMERA`
- Camera hardware features

### Bluetooth LE

⚠️ **Physical device ONLY** - Emulators do NOT support Bluetooth hardware

Required permissions (already configured in AndroidManifest.xml):
- `android.permission.BLUETOOTH`
- `android.permission.BLUETOOTH_ADMIN`
- `android.permission.BLUETOOTH_CONNECT`
- `android.permission.BLUETOOTH_SCAN`
- `android.permission.ACCESS_FINE_LOCATION`
- `android.permission.ACCESS_COARSE_LOCATION`

### TensorFlow.js

✅ Works on both physical devices and emulators

No special permissions required. Runs in WebView.

## Requirements

- Node.js 18+
- Android Studio (for Android development)
- JDK 17+
- Android SDK API 33+
- **Physical Android Device** with USB cable (strongly recommended for full feature testing)

## Physical Device Setup

**Important:** Camera Preview and Bluetooth LE require a physical Android device. Emulators do not support these features.

**New to physical device development?** See [PHYSICAL_DEVICE_QUICK_START.md](./PHYSICAL_DEVICE_QUICK_START.md) for a 5-minute setup guide.

See [ANDROID_SETUP.md](./ANDROID_SETUP.md) for complete setup guide:
- Enabling USB Debugging
- Connecting your device
- Running and debugging on device
- Building and installing APKs
- Troubleshooting device connection
- Device-specific tips (Samsung, Pixel, Xiaomi, etc.)
- Wireless debugging (Android 11+)

### Quick Setup

1. **Enable Developer Options** on your Android device:
   - Go to Settings > About Phone
   - Tap Build Number 7 times

2. **Enable USB Debugging**:
   - Settings > Developer Options > USB Debugging

3. **Connect and run**:
   ```bash
   # Connect device via USB
   # Allow USB debugging when prompted
   npm run android:run
   ```

## Browser Development (Limited)

You can develop the UI in a browser, but native features won't work:

```bash
npm run dev
```

**Note:** Camera, Bluetooth, and most Capacitor APIs require a physical device. Browser development is only for UI/layout work.

## Production Build

```bash
# Build web assets
npm run build

# Sync to Android
npm run android:sync

# Build release APK
npm run android:release
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
