---
description: Build a debug or release APK for distribution
---

Build an Android APK file for testing or distribution.

Ask the user which build type they want:
1. **Debug APK** - For testing (npm run android:build)
2. **Release APK** - For distribution (requires signing)

For Debug APK:
1. Run: `npm run android:build`
2. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`
3. Install command: `adb install android/app/build/outputs/apk/debug/app-debug.apk`

For Release APK:
1. Check if keystore exists
2. If not, guide through keystore creation:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
3. Update signing config in android/app/build.gradle
4. Run: `npm run android:release`
5. APK location: `android/app/build/outputs/apk/release/app-release.apk`

Provide the APK file path after successful build.
