# Claude Code Skills & Commands

This project includes custom Claude Code skills to streamline development workflow for React + Ionic + Capacitor mobile app development.

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `/check-device` | Check connected Android devices |
| `/run-device` | Build and run on device |
| `/view-logs` | View live device logs |
| `/build-apk` | Build APK for distribution |
| `/debug-remote` | Set up Chrome DevTools debugging |
| `/sync-android` | Sync web assets to Android |
| `/test-plugins` | Test Camera & Bluetooth plugins |
| `/clean-rebuild` | Clean and rebuild everything |

## 🚀 Session Start Hook

When you start a Claude Code session, it automatically:
- ✅ Checks for installed dependencies
- ✅ Verifies Android platform setup
- ✅ Detects connected devices
- ✅ Displays available commands
- ✅ Shows quick reference links

## 📱 Device Management Commands

### `/check-device`
**Check for connected Android devices**

Quickly verify if your Android device is properly connected and recognized:
- Shows device serial numbers and models
- Displays Android version and API level
- Checks if app is installed
- Provides troubleshooting steps if no devices found

**When to use:**
- Before running the app
- Troubleshooting connection issues
- Verifying USB debugging setup

---

### `/run-device`
**Build and run on connected device**

Complete build and deployment pipeline:
1. Checks for connected devices
2. Builds TypeScript and web assets
3. Syncs with Capacitor
4. Builds Android APK
5. Installs on device
6. Launches the app

**When to use:**
- Testing code changes on device
- After modifying web assets
- Fresh deployment needed

**Equivalent to:** `npm run android:run`

---

## 📋 Debugging Commands

### `/view-logs`
**View live logs from device**

Stream real-time logs from your connected Android device:
- Filters for relevant tags (chromium, Capacitor, Console)
- Identifies JavaScript errors
- Catches plugin issues
- Detects permission errors

**When to use:**
- Debugging runtime errors
- Testing plugin functionality
- Monitoring app behavior
- Troubleshooting crashes

**Equivalent to:** `adb logcat | grep -E "(chromium|Capacitor|Console)"`

---

### `/debug-remote`
**Set up Chrome DevTools remote debugging**

Complete guide to debugging with Chrome DevTools:
1. Connect device via USB
2. Open chrome://inspect/#devices
3. Find your app
4. Launch DevTools

**Features:**
- Inspect DOM elements
- Debug JavaScript
- View console logs
- Monitor network requests
- Profile performance

**When to use:**
- Debugging complex issues
- Inspecting UI elements
- Testing responsive design
- Performance profiling

---

## 🛠️ Build Commands

### `/build-apk`
**Build APK for distribution**

Guided APK building process:
- **Debug APK** - For testing (quick build)
- **Release APK** - For distribution (requires signing)

**Debug build:**
```bash
npm run android:build
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

**Release build:**
- Guides through keystore creation
- Updates signing configuration
- Builds signed release APK

**When to use:**
- Sharing app with testers
- Installing on multiple devices
- Preparing for release

---

### `/sync-android`
**Sync web assets to Android**

Synchronize your web build with the Android platform:
1. Builds web assets (Vite + TypeScript)
2. Copies to Android project
3. Updates plugin configurations
4. Registers Capacitor plugins

**When to use:**
- After code changes
- After installing plugins
- After updating configurations
- Before opening in Android Studio

**Equivalent to:** `npm run android:sync`

---

### `/clean-rebuild`
**Clean all caches and rebuild**

Nuclear option for build issues:
1. Cleans web build artifacts
2. Cleans Android Gradle cache
3. Removes Capacitor assets
4. Rebuilds from scratch

**When to use:**
- Unexplained build errors
- After major updates
- Stale cache issues
- Plugin registration problems

**What it does:**
```bash
rm -rf dist/ node_modules/.vite/
cd android && ./gradlew clean && cd ..
rm -rf android/app/src/main/assets/public/
npm run build && npm run android:sync
```

---

## 🔧 Testing Commands

### `/test-plugins`
**Test Camera Preview and Bluetooth LE**

Comprehensive testing guide for native features:

**Camera Preview:**
- Verifies camera permissions
- Tests front/rear camera switching
- Validates photo capture
- Troubleshoots common issues

**Bluetooth LE:**
- Checks Bluetooth permissions
- Tests device scanning
- Validates connections
- Explains emulator limitations

**TensorFlow.js:**
- Verifies library loading
- Tests inference capabilities

**When to use:**
- After installing plugins
- Verifying native features
- Before releasing to testers
- Troubleshooting permissions

**Important:** Physical device required - emulators don't support Bluetooth!

---

## 🔨 Helper Scripts

Located in `scripts/` directory:

### `quick-device-check.sh`
Comprehensive device status check:
- Lists connected devices
- Shows device properties
- Checks app installation
- Displays quick actions

**Usage:**
```bash
./scripts/quick-device-check.sh
```

### `install-apk.sh`
Install APK on connected device:
- Uninstalls old version
- Installs new APK
- Launches the app

**Usage:**
```bash
./scripts/install-apk.sh         # Install debug APK
./scripts/install-apk.sh release # Install release APK
```

---

## 📚 Project Context

These skills are designed for:
- **React 19** + TypeScript
- **Ionic Framework 8**
- **Capacitor 7**
- **Tailwind CSS 4**
- **Camera Preview** plugin
- **Bluetooth LE** plugin
- **TensorFlow.js**

## ⚠️ Important Notes

### Physical Device Required
- Camera Preview: Limited on emulators
- Bluetooth LE: **Does NOT work on emulators**
- TensorFlow: Works on both, better on devices

### Permissions Required
Already configured in `AndroidManifest.xml`:
- Camera
- Bluetooth (BLUETOOTH, BLUETOOTH_ADMIN, BLUETOOTH_CONNECT, BLUETOOTH_SCAN)
- Location (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION)

## 🎓 Learning Path

**For beginners:**
1. Start with `/check-device` to verify setup
2. Use `/run-device` to deploy your first build
3. Try `/view-logs` to see what's happening
4. Explore `/debug-remote` for interactive debugging

**For experienced developers:**
1. Use `/sync-android` for quick iterations
2. Leverage `/test-plugins` for feature validation
3. Use `/build-apk` for distribution
4. Use `/clean-rebuild` when things go wrong

## 🔗 Related Documentation

- [PHYSICAL_DEVICE_QUICK_START.md](./PHYSICAL_DEVICE_QUICK_START.md) - 5-minute device setup
- [ANDROID_SETUP.md](./ANDROID_SETUP.md) - Complete Android guide
- [README.md](./README.md) - Project overview
- [.claude/README.md](./.claude/README.md) - Technical command details

## 💡 Pro Tips

1. **Always check device first:** Run `/check-device` before `/run-device`
2. **Use logs for debugging:** `/view-logs` is your best friend
3. **Clean when stuck:** `/clean-rebuild` solves many mysterious issues
4. **Test plugins early:** Use `/test-plugins` to catch permission issues
5. **Remote debugging:** `/debug-remote` gives you full DevTools power

## 🤝 Contributing

To add new commands:
1. Create `.claude/commands/your-command.md`
2. Add frontmatter with description
3. Write clear instructions
4. Include troubleshooting tips
5. Update this documentation

## 🆘 Getting Help

If commands aren't working:
1. Check `.claude/commands/` files exist
2. Verify `session-start.sh` is executable
3. Restart Claude Code session
4. Check [Claude Code docs](https://docs.claude.com/en/docs/claude-code)

## 🎉 Happy Coding!

These skills are designed to make your React + Ionic + Capacitor development faster and more efficient. Use them liberally!

For questions or issues, see:
- Project README.md
- Android setup guides
- Claude Code documentation
