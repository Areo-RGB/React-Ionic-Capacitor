---
description: Clean all build artifacts and rebuild from scratch
---

Perform a complete clean and rebuild of the project, useful when experiencing build issues or caching problems.

Steps:
1. Clean web build artifacts
2. Clean Android build artifacts
3. Clean Capacitor cache
4. Rebuild everything

Execute the following commands:

```bash
# Clean web build
rm -rf dist/
rm -rf node_modules/.vite/

# Clean Android build
cd android
./gradlew clean
cd ..

# Clean Capacitor
rm -rf android/app/src/main/assets/public/

# Rebuild web
npm run build

# Sync to Android
npm run android:sync
```

This process:
1. Removes all compiled/cached files
2. Forces fresh TypeScript compilation
3. Clears Vite cache
4. Cleans Gradle build cache
5. Removes old web assets from Android
6. Rebuilds everything from source
7. Syncs fresh build to Android

When to use:
- Strange build errors that don't make sense
- "Could not find..." errors
- Stale cache issues
- After major dependency updates
- Plugin registration issues
- After pulling new code from git

After clean rebuild, you can:
- Run on device: `npm run android:run`
- Open in Android Studio: `npm run android:open`

Monitor for errors and help troubleshoot if the rebuild fails.
