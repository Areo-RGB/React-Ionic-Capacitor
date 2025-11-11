#!/bin/bash
# Install APK on Connected Device
# Usage: ./scripts/install-apk.sh [debug|release]

BUILD_TYPE=${1:-debug}

echo "📦 Installing APK on Android Device"
echo "===================================="
echo ""
echo "Build type: $BUILD_TYPE"
echo ""

# Check if adb is available
if ! command -v adb &> /dev/null; then
    echo "❌ ADB not found in PATH"
    exit 1
fi

# Check for connected devices
DEVICE_COUNT=$(adb devices | grep -v "List of devices" | grep "device$" | wc -l)
if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo "❌ No devices connected"
    echo "   Connect your device and enable USB Debugging"
    exit 1
fi

echo "✅ Found $DEVICE_COUNT device(s)"
echo ""

# Determine APK path
if [ "$BUILD_TYPE" = "release" ]; then
    APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
else
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
fi

# Check if APK exists
if [ ! -f "$APK_PATH" ]; then
    echo "❌ APK not found: $APK_PATH"
    echo ""
    echo "Build the APK first:"
    if [ "$BUILD_TYPE" = "release" ]; then
        echo "   npm run android:release"
    else
        echo "   npm run android:build"
    fi
    exit 1
fi

echo "📁 APK found: $APK_PATH"
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
echo "   Size: $APK_SIZE"
echo ""

# Uninstall old version
PACKAGE="io.ionic.starter"
echo "🗑️  Uninstalling old version..."
adb uninstall $PACKAGE 2>/dev/null || echo "   No previous installation found"
echo ""

# Install APK
echo "📲 Installing APK..."
if adb install "$APK_PATH"; then
    echo ""
    echo "✅ Installation successful!"
    echo ""
    echo "🚀 Launching app..."
    adb shell am start -n $PACKAGE/.MainActivity
    echo ""
    echo "✅ App launched!"
    echo ""
    echo "📱 View logs: adb logcat | grep -i chromium"
    echo "🐛 Debug: chrome://inspect/#devices"
else
    echo ""
    echo "❌ Installation failed"
    exit 1
fi
