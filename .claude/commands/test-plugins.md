---
description: Guide for testing Camera Preview and Bluetooth LE plugins on device
---

Help test the native plugins (Camera Preview and Bluetooth LE) on the connected Android device.

Prerequisites:
1. Physical Android device connected via USB (required - emulators won't work)
2. App installed and running on device
3. Permissions granted (Camera, Bluetooth, Location)

Testing Camera Preview:
1. Open the app on device
2. Navigate to Camera Preview card
3. Tap to activate camera
4. Verify:
   - Camera preview displays
   - Can switch between front/rear cameras
   - Can capture photos
   - No permission errors

Common issues:
- Permission denied: Check AndroidManifest.xml for CAMERA permission
- Black screen: Ensure physical device (emulators have limited camera)
- Crash: Check logs with `adb logcat | grep Camera`

Testing Bluetooth LE:
1. Ensure Bluetooth is enabled on device
2. Open the app
3. Navigate to Bluetooth LE card
4. Tap to scan for devices
5. Verify:
   - Can scan for nearby BLE devices
   - Devices appear in list
   - Can connect to devices (if BLE devices available)

Common issues:
- No devices found: Enable Bluetooth, grant location permission
- Permission denied: Check AndroidManifest.xml for Bluetooth and Location permissions
- Not working: Emulators don't support Bluetooth - must use physical device
- Crash: Check logs with `adb logcat | grep Bluetooth`

Required permissions in AndroidManifest.xml:
- CAMERA
- BLUETOOTH, BLUETOOTH_ADMIN
- BLUETOOTH_CONNECT, BLUETOOTH_SCAN (Android 12+)
- ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION

Testing TensorFlow:
1. Open the app
2. Navigate to TensorFlow AI card
3. Verify TensorFlow.js loads correctly
4. Test inference if models are loaded

Suggest viewing logs during testing:
```bash
adb logcat | grep -E "(chromium|Console|Capacitor)"
```
