---
description: Check for connected Android devices and their status
---

Check for connected Android devices using ADB and display their status.

Run the following command:
```bash
adb devices -l
```

If devices are found, show:
- Device serial numbers
- Device models
- Connection status

If no devices found, provide troubleshooting steps:
1. Enable USB Debugging in Developer Options
2. Connect via USB cable
3. Allow USB debugging prompt on device
4. Try: `adb kill-server && adb start-server`

Also check if any emulators are running.
