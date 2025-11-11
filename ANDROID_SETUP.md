# Android Physical Device Setup Guide

This guide will help you set up and run the React + Ionic + Capacitor mobile app on a **physical Android device**. Physical devices are recommended for testing Camera, Bluetooth LE, and other native features.

## Prerequisites

1. **Node.js** (v18 or later)
2. **Android Studio** (latest version)
3. **Java Development Kit (JDK)** 17 or later
4. **Physical Android Device** with USB cable (Android 8.0+ recommended)

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

## Setting Up Your Physical Android Device

### Enable Developer Options

1. **Open Settings** on your Android device
2. Navigate to **About Phone** (or **About Device**)
3. Find **Build Number** (may be under Software Information)
4. **Tap Build Number 7 times** until you see "You are now a developer!"

### Enable USB Debugging

1. **Go back to Settings**
2. Navigate to **System** > **Developer Options** (or just **Developer Options**)
3. **Enable USB Debugging**
4. (Optional but recommended) Enable **Stay Awake** - keeps screen on while charging
5. (Optional) Enable **Disable Permission Monitoring** - reduces warnings during development

### Additional Recommended Settings

1. **Install via USB** - Enable this in Developer Options
2. **USB Configuration** - Set to "MTP (Media Transfer Protocol)" or "PTP"
3. **Select USB Configuration** - Choose "Charging" or "File Transfer"

## Connecting Your Device

### 1. Connect via USB

1. Connect your Android device to your computer using a USB cable
2. On your device, you'll see a prompt: **"Allow USB debugging?"**
3. Check **"Always allow from this computer"**
4. Tap **OK**

### 2. Verify Connection

```bash
# Check if device is detected
npx cap run android --list

# Or use Android Debug Bridge (adb)
cd android
./gradlew --version  # Verify Gradle works
cd ..

# List connected devices
adb devices
```

You should see your device listed with its serial number.

### 3. If Device Not Detected

**On Windows:**
- Install appropriate USB drivers for your device manufacturer
- Check Device Manager for driver issues

**On macOS:**
- No additional drivers needed
- Try a different USB cable (some cables are charge-only)

**On Linux:**
- You may need to configure udev rules
- Create file: `/etc/udev/rules.d/51-android.rules`
- Add: `SUBSYSTEM=="usb", ATTR{idVendor}=="YOUR_VENDOR_ID", MODE="0666", GROUP="plugdev"`
- Restart udev: `sudo udevadm control --reload-rules`

## Running the App on Physical Device

### Option 1: Using npm Scripts (Recommended)

```bash
# Run on connected physical device
npm run android:run

# The app will build, sync, and install automatically
```

The app will:
1. Build the web assets
2. Sync with Capacitor
3. Build the Android APK
4. Install and launch on your device

### Option 2: Using Android Studio

1. **Open the project in Android Studio:**
   ```bash
   npm run android:open
   ```

2. **Wait for Gradle sync to complete**

3. **Select your physical device** from the device dropdown in the toolbar
   - Your device should appear with its model name
   - Example: "Samsung Galaxy S21 (192.168.1.100:5555)"

4. **Click the Run button** (green play icon) or press `Shift + F10`

### Option 3: Build and Install Manually

```bash
# Build debug APK
npm run android:build

# Install on device using adb
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or install and launch
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n io.ionic.starter/.MainActivity
```

## Live Reload / Hot Reload

For faster development with live reload on your physical device:

```bash
# Start development server
npm run dev

# In another terminal, note your local IP address
# On Linux/Mac:
ifconfig | grep "inet "

# On Windows:
ipconfig

# Update capacitor.config.ts with your local IP
# Then sync and run
npm run android:sync
npx cap run android
```

## Debugging on Physical Device

### Chrome DevTools

1. Connect your device via USB
2. Open **Chrome** on your computer
3. Navigate to `chrome://inspect/#devices`
4. Your device and app should appear under "Remote Target"
5. Click **inspect** to open DevTools

### View Logs

```bash
# View real-time logs
adb logcat

# Filter for your app
adb logcat | grep -i "chromium"

# Clear and view logs
adb logcat -c && adb logcat
```

### Install/Uninstall

```bash
# Uninstall the app
adb uninstall io.ionic.starter

# Reinstall
npm run android:run
```

## Testing Native Features

### Camera Preview
✅ **Works on physical device** - Full camera access with real-time preview
- Front and rear cameras
- Flash control
- Focus and zoom

### Bluetooth LE
✅ **Works on physical device only** - Full Bluetooth Low Energy support
- Scan for nearby BLE devices
- Connect to IoT sensors
- Read/write characteristics

⚠️ **Does NOT work on emulator** - Emulators don't have Bluetooth hardware

### TensorFlow
✅ **Works on physical device** - Full TensorFlow.js support
- On-device inference
- Better performance than emulator
- Real camera input for ML models

## Troubleshooting

### Device Not Detected

```bash
# Restart adb server
adb kill-server
adb start-server
adb devices
```

### App Won't Install

```bash
# Clear app data first
adb uninstall io.ionic.starter

# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android:build

# Install fresh
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Gradle Build Errors

```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

### Permission Denied Errors

```bash
# On Linux, add your user to plugdev group
sudo usermod -aG plugdev $USER

# Logout and login again
```

### App Crashes on Launch

```bash
# Check logs
adb logcat | grep -E "AndroidRuntime|chromium"

# Verify permissions in AndroidManifest.xml
# Camera and Bluetooth permissions should be present
```

## Building for Production

### Debug Build (Physical Device Testing)

```bash
npm run android:build
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

Transfer to device:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Release Build (Production)

1. **Generate a signing keystore:**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore \
     -alias my-key-alias \
     -keyalg RSA \
     -keysize 2048 \
     -validity 10000
   ```

2. **Create signing config** in `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file('../../my-release-key.keystore')
               storePassword 'your-keystore-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-key-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled false
               proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

3. **Build signed release APK:**
   ```bash
   npm run android:release
   ```

4. **Install on device:**
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Wireless Debugging (Android 11+)

For wireless development without USB cable:

### Pair Device Over WiFi

1. **Enable Wireless Debugging** on device:
   - Settings > Developer Options > Wireless Debugging
   - Turn it ON

2. **Pair with computer:**
   ```bash
   # Get pairing code from device (tap "Pair device with pairing code")
   # Note the IP address and port

   adb pair <IP>:<PORT>
   # Enter pairing code when prompted

   # Connect to device
   adb connect <IP>:<PORT>

   # Verify connection
   adb devices
   ```

3. **Run app wirelessly:**
   ```bash
   npm run android:run
   ```

## Emulator Setup (Optional)

If you need an emulator for quick testing without native features:

### Create Virtual Device

1. Open Android Studio: `npm run android:open`
2. Click **Device Manager** (phone icon)
3. Click **Create Device**
4. Select device: **Pixel 6 or Pixel 7**
5. Select system image: **API 33+** (Android 13+)
6. Configure and create

**Note:** Bluetooth LE will NOT work in emulator. Camera and other features will have limited functionality.

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build web assets |
| `npm run android:sync` | Build and sync to Android |
| `npm run android:run` | Run on connected device |
| `npm run android:open` | Open in Android Studio |
| `npm run android:build` | Build debug APK |
| `npm run android:release` | Build release APK |
| `adb devices` | List connected devices |
| `adb install <path>` | Install APK on device |
| `adb uninstall <package>` | Uninstall app from device |
| `adb logcat` | View device logs |

## Device-Specific Tips

### Samsung Devices
- May need **Samsung USB drivers** on Windows
- Enable **Install via USB** in Developer Options

### Google Pixel
- Usually works out of the box
- Ensure **File Transfer** mode is selected

### OnePlus / Oppo / Realme
- May need to enable **OEM Unlocking** in Developer Options
- Disable **Permission Monitoring** for smoother development

### Xiaomi / Redmi
- Enable **USB Debugging (Security Settings)**
- Enable **Install via USB**
- May need to allow USB debugging with a popup

## Additional Resources

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android Developer - Run Apps on Device](https://developer.android.com/studio/run/device)
- [ADB User Guide](https://developer.android.com/studio/command-line/adb)
- [Ionic Framework Docs](https://ionicframework.com/docs)
