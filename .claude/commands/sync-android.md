---
description: Sync web assets and plugins to Android platform
---

Synchronize the web build and Capacitor plugins to the Android platform.

This command:
1. Builds the web assets (Vite build)
2. Copies them to Android project
3. Updates native plugin configurations
4. Ensures all Capacitor plugins are registered

Run:
```bash
npm run android:sync
```

This is useful when:
- You've updated web code and want to test on device
- You've installed new Capacitor plugins
- Plugin configurations have changed
- AndroidManifest.xml needs updating

The sync process:
1. Runs `npm run build` (TypeScript compile + Vite build)
2. Runs `npx cap sync android`
3. Copies dist/ to android/app/src/main/assets/public
4. Updates android/app/src/main/assets/capacitor.config.json
5. Registers plugins in Android project

After syncing, you can:
- Open in Android Studio: `npm run android:open`
- Run on device: `npm run android:run`
- Build APK: `npm run android:build`

Monitor for any errors during the sync process and help troubleshoot if needed.
