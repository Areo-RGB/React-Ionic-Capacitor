#!/bin/bash
# Quick Android Device Check Script
# Provides a quick overview of connected devices and their status

echo "🔍 Android Device Check"
echo "======================="
echo ""

# Check if adb is available
if ! command -v adb &> /dev/null; then
    echo "❌ ADB not found in PATH"
    echo "   Add Android SDK platform-tools to your PATH"
    echo "   Typical location:"
    echo "   - macOS/Linux: ~/Library/Android/sdk/platform-tools"
    echo "   - Windows: C:\\Users\\USERNAME\\AppData\\Local\\Android\\Sdk\\platform-tools"
    exit 1
fi

echo "✅ ADB found: $(which adb)"
echo ""

# Check for connected devices
echo "📱 Connected Devices:"
DEVICES=$(adb devices | grep -v "List of devices" | grep -v "^$")

if [ -z "$DEVICES" ]; then
    echo "   ⚠️  No devices connected"
    echo ""
    echo "   Troubleshooting:"
    echo "   1. Connect device via USB"
    echo "   2. Enable USB Debugging in Developer Options"
    echo "   3. Allow USB debugging on device when prompted"
    echo "   4. Try: adb kill-server && adb start-server"
else
    echo "$DEVICES"

    # Count devices
    DEVICE_COUNT=$(echo "$DEVICES" | grep "device$" | wc -l)
    echo ""
    echo "   ✅ Found $DEVICE_COUNT device(s)"

    # Get detailed info for each device
    echo ""
    echo "📋 Device Details:"
    adb devices -l

    # Check device properties
    echo ""
    echo "🔧 Device Properties:"
    for device in $(adb devices | grep "device$" | awk '{print $1}'); do
        echo "   Device: $device"
        MODEL=$(adb -s $device shell getprop ro.product.model | tr -d '\r')
        ANDROID=$(adb -s $device shell getprop ro.build.version.release | tr -d '\r')
        API=$(adb -s $device shell getprop ro.build.version.sdk | tr -d '\r')
        echo "   Model: $MODEL"
        echo "   Android: $ANDROID (API $API)"
        echo ""
    done
fi

# Check if app is installed
echo "📦 App Status:"
PACKAGE="io.ionic.starter"
if adb shell pm list packages | grep -q "$PACKAGE"; then
    echo "   ✅ App installed: $PACKAGE"

    # Check if app is running
    if adb shell pidof $PACKAGE > /dev/null 2>&1; then
        echo "   ✅ App is currently running"
    else
        echo "   ⚠️  App is installed but not running"
    fi
else
    echo "   ⚠️  App not installed"
    echo "   Run: npm run android:run"
fi

echo ""
echo "🚀 Quick Actions:"
echo "   npm run android:run      - Build and run on device"
echo "   npm run android:open     - Open in Android Studio"
echo "   adb logcat              - View device logs"
echo "   chrome://inspect        - Remote debugging"
echo ""
