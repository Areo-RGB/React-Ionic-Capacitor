# Physical Device Quick Start Guide

Get your Android device connected and running in 5 minutes!

## Prerequisites Checklist

- [ ] Android device (Android 8.0+)
- [ ] USB cable (data transfer capable)
- [ ] Android Studio installed
- [ ] Node.js installed

## 3-Step Setup

### Step 1: Enable Developer Mode (30 seconds)

On your Android device:

1. Open **Settings**
2. Scroll to **About Phone** (or **About Device**)
3. Find **Build Number**
4. **Tap it 7 times rapidly**
5. You'll see: "You are now a developer!"

### Step 2: Enable USB Debugging (30 seconds)

1. Go back to main **Settings**
2. Find **Developer Options** (usually under System)
3. Toggle **USB Debugging** ON
4. (Optional) Toggle **Stay Awake** ON
5. (Optional) Toggle **Install via USB** ON

### Step 3: Connect and Run (2 minutes)

```bash
# 1. Connect your device via USB cable

# 2. On your device, allow USB debugging when prompted
#    ✓ Check "Always allow from this computer"

# 3. Verify connection
adb devices
# You should see your device listed

# 4. Build and run
npm run android:run
```

## That's It!

The app will:
1. ✅ Build the web assets
2. ✅ Sync with Capacitor
3. ✅ Build the Android APK
4. ✅ Install on your device
5. ✅ Launch automatically

## Common Issues & Quick Fixes

### Device Not Showing Up?

```bash
# Restart ADB
adb kill-server
adb start-server
adb devices
```

**Still not working?**
- Try a different USB cable (some are charge-only)
- Check USB is in "File Transfer" or "MTP" mode
- Try a different USB port on your computer

### Permission Denied?

**On device:**
- Unplug and replug USB cable
- Look for "Allow USB debugging?" prompt
- Tap "Always allow" and OK

**On Linux:**
```bash
sudo usermod -aG plugdev $USER
# Logout and login
```

### App Won't Install?

```bash
# Uninstall old version
adb uninstall io.ionic.starter

# Clean build
cd android && ./gradlew clean && cd ..

# Try again
npm run android:run
```

## Useful Commands

```bash
# Check connected devices
adb devices

# Build only (don't run)
npm run android:build

# Open in Android Studio
npm run android:open

# View live logs
adb logcat | grep -i chromium

# Uninstall app
adb uninstall io.ionic.starter

# Restart app
adb shell am start -n io.ionic.starter/.MainActivity
```

## Test Your Native Features

### Camera Preview Test
1. Open the app
2. Camera Preview card should be visible
3. Tap to test camera access
4. ✅ Real camera feed should appear

### Bluetooth LE Test
1. Open the app
2. Bluetooth LE card should be visible
3. Tap to scan for devices
4. ✅ Nearby BLE devices should appear

### TensorFlow Test
1. Open the app
2. TensorFlow AI card should be visible
3. Features should load
4. ✅ ML inference should work

## Debug in Chrome

1. Connect device via USB
2. Open Chrome on your computer
3. Go to: `chrome://inspect/#devices`
4. Find your device and app
5. Click **inspect**
6. ✅ Full DevTools access!

## Wireless Debugging (Android 11+)

No USB cable needed after initial pairing:

```bash
# On device:
# Settings > Developer Options > Wireless Debugging > ON

# On computer:
adb pair <IP>:<PORT>
# Enter pairing code from device

adb connect <IP>:<PORT>

# Now run wirelessly
npm run android:run
```

## Build APK to Share

```bash
# Build debug APK
npm run android:build

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk

# Install on another device
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or share the APK file via email/cloud
```

## Need More Help?

See full documentation:
- [ANDROID_SETUP.md](./ANDROID_SETUP.md) - Complete setup guide
- [README.md](./README.md) - Project overview

## Device-Specific Quick Fixes

### Samsung
- Enable **Install via USB** in Developer Options
- May need Samsung USB drivers on Windows

### Xiaomi / Redmi
- Enable **USB Debugging (Security Settings)**
- Enable **Install via USB**

### OnePlus / Oppo
- Disable **Permission Monitoring** in Developer Options

### Huawei
- Enable **Allow ADB debugging in charge only mode**

## Success Checklist

- [x] Developer Options enabled
- [x] USB Debugging enabled
- [x] Device connected and recognized by `adb devices`
- [x] App installed and running on device
- [x] Camera access working
- [x] Bluetooth scanning working
- [x] No error messages

## Next Steps

- Read [ANDROID_SETUP.md](./ANDROID_SETUP.md) for advanced features
- Learn about wireless debugging
- Set up Chrome DevTools for debugging
- Build release APK for distribution

Happy coding! 🚀
