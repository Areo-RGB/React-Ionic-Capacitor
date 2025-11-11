# Android Studio Setup Guide

This guide will help you set up and run the React + Ionic + Capacitor mobile app using Android Studio.

## Prerequisites

1. **Node.js** (v18 or later)
2. **Android Studio** (latest version)
3. **Java Development Kit (JDK)** 17 or later

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Web App

```bash
npm run build
```

### 3. Sync with Android Platform

```bash
npm run android:sync
```

## Android Studio Configuration

### Setting Up an Emulator

1. **Open Android Studio**
   ```bash
   npm run android:open
   ```
   This will open the project in Android Studio.

2. **Create a Virtual Device**
   - Click on **Device Manager** (phone icon in the toolbar)
   - Click **Create Device**
   - Select a device definition (recommended: Pixel 6 or Pixel 7)
   - Click **Next**

3. **Select System Image**
   - Choose API Level 33 or higher (Android 13+)
   - Download the system image if needed
   - Click **Next**

4. **Configure AVD**
   - Name: `Pixel_6_API_33` (or your preference)
   - Graphics: **Hardware - GLES 2.0**
   - Click **Finish**

### Running the App

#### Option 1: Using npm Scripts

```bash
# Run on connected device/emulator
npm run android:run

# Build debug APK
npm run android:build

# Build release APK
npm run android:release
```

#### Option 2: Using Android Studio

1. Open the project in Android Studio:
   ```bash
   npm run android:open
   ```

2. Wait for Gradle sync to complete

3. Select your emulator from the device dropdown

4. Click the **Run** button (green play icon) or press `Shift + F10`

## Troubleshooting

### Gradle Build Errors

If you encounter Gradle sync errors:

```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

### Clear Cache

```bash
cd android
./gradlew clean build --refresh-dependencies
cd ..
```

### Plugin Not Found

If Capacitor plugins aren't recognized:

```bash
npm run cap:sync
```

## Environment Variables

Create a `local.properties` file in the `android` directory:

```properties
sdk.dir=/path/to/your/Android/sdk
```

On macOS/Linux, this is typically:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

On Windows:
```
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

## Emulator Performance Tips

1. **Enable Hardware Acceleration**
   - Ensure Intel HAXM (Intel) or AMD Hypervisor (AMD) is installed
   - Enable VT-x/AMD-V in BIOS

2. **Allocate More RAM**
   - Edit AVD settings
   - Increase RAM to 2048 MB or more

3. **Use Cold Boot**
   - Emulator > Extended Controls > Settings
   - Boot option: Cold boot

## Testing Plugins

### Camera Preview
The app includes camera preview functionality. Test it on a physical device for best results, or use the emulator's virtual camera.

### Bluetooth LE
Bluetooth testing requires a physical device with Bluetooth capabilities. The Android emulator doesn't support Bluetooth hardware.

### TensorFlow
TensorFlow.js runs in the WebView and works in both emulators and physical devices.

## Building for Production

### Debug Build

```bash
npm run android:build
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Update `android/app/build.gradle` with signing config

3. Build release:
   ```bash
   npm run android:release
   ```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build web assets |
| `npm run android:sync` | Build and sync to Android |
| `npm run android:run` | Run on device/emulator |
| `npm run android:open` | Open in Android Studio |
| `npm run android:build` | Build debug APK |
| `npm run android:release` | Build release APK |
| `npm run cap:sync` | Sync all platforms |
| `npm run cap:update` | Update Capacitor |

## Additional Resources

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Ionic Framework Docs](https://ionicframework.com/docs)
