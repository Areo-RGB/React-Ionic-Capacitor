#!/bin/bash
# Claude Code Session Start Hook for React + Ionic + Capacitor Project
# This script runs automatically when starting a Claude Code session

echo "🚀 Initializing React + Ionic + Capacitor Mobile Project..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Run 'npm install' to install dependencies."
else
    echo "✅ Dependencies installed"
fi

# Check if Android platform is added
if [ ! -d "android" ]; then
    echo "⚠️  Android platform not found. Run 'npx cap add android' after building."
else
    echo "✅ Android platform configured"
fi

# Check for connected Android devices
echo ""
echo "🔍 Checking for connected Android devices..."
if command -v adb &> /dev/null; then
    DEVICES=$(adb devices | grep -v "List of devices" | grep "device$" | wc -l)
    if [ "$DEVICES" -gt 0 ]; then
        echo "✅ Found $DEVICES connected device(s):"
        adb devices | grep "device$"
    else
        echo "⚠️  No Android devices connected"
        echo "   Connect your device via USB and enable USB Debugging"
        echo "   See PHYSICAL_DEVICE_QUICK_START.md for setup instructions"
    fi
else
    echo "ℹ️  ADB not in PATH. Android Studio SDK tools may need to be added to PATH."
fi

# Display project info
echo ""
echo "📱 Project: Mobile App with Camera, Bluetooth LE & TensorFlow"
echo ""
echo "🛠️  Available npm scripts:"
echo "   npm run dev              - Start Vite dev server"
echo "   npm run build            - Build web assets"
echo "   npm run android:sync     - Build and sync to Android"
echo "   npm run android:run      - Run on connected device"
echo "   npm run android:open     - Open in Android Studio"
echo "   npm run android:build    - Build debug APK"
echo ""
echo "📚 Quick guides:"
echo "   - PHYSICAL_DEVICE_QUICK_START.md - 5-minute device setup"
echo "   - ANDROID_SETUP.md - Complete Android guide"
echo "   - README.md - Project overview"
echo ""
echo "💡 Pro tip: Use physical device for Camera Preview and Bluetooth LE testing!"
echo ""
