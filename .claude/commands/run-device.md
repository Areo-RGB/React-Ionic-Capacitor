---
description: Build and run the app on a connected Android device
---

Build the React + Ionic app and deploy it to a connected Android device.

Steps:
1. Check for connected devices first using `adb devices`
2. If device found, run: `npm run android:run`
3. Monitor the build output for any errors
4. Wait for app to install and launch on device
5. If errors occur, suggest relevant fixes:
   - Build errors: Check TypeScript/ESLint issues
   - Sync errors: Try `npm run android:sync`
   - Device errors: Check USB connection and debugging enabled
   - Permission errors: Verify AndroidManifest.xml has required permissions

After successful deployment, suggest testing:
- Camera Preview card functionality
- Bluetooth LE scanning
- TensorFlow features
