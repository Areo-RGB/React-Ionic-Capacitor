---
description: View live logs from connected Android device
---

Display real-time logs from the connected Android device for debugging.

Run logcat with appropriate filters:
```bash
adb logcat | grep -E "(chromium|Capacitor|Console)"
```

Explain the log output and help identify:
- JavaScript errors in the WebView
- Capacitor plugin issues
- Camera/Bluetooth permission errors
- Network errors
- Crash reports

Provide tips:
- To clear logs first: `adb logcat -c`
- To save logs to file: `adb logcat > logs.txt`
- To filter by tag: `adb logcat -s TAG_NAME`

If errors are found, suggest relevant fixes based on the error messages.
