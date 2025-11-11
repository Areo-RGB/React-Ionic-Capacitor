---
description: Set up Chrome DevTools for remote debugging on Android device
---

Set up remote debugging using Chrome DevTools to debug the app running on a physical device.

Steps:
1. Ensure device is connected via USB with USB Debugging enabled
2. Verify connection: `adb devices`
3. Open Chrome on your computer
4. Navigate to: `chrome://inspect/#devices`
5. Wait for device to appear under "Remote Target"
6. Look for "io.ionic.starter" or the app name
7. Click "inspect" to open DevTools

What you can do in DevTools:
- Inspect DOM elements
- Debug JavaScript
- View console logs
- Monitor network requests
- Profile performance
- Test responsive layouts

Troubleshooting:
- Device not appearing? Try: `adb kill-server && adb start-server`
- App not listed? Ensure app is running on device
- Can't connect? Check USB cable and debugging permissions

Also mention wireless debugging option for Android 11+:
```bash
adb pair <IP>:<PORT>
adb connect <IP>:<PORT>
```
