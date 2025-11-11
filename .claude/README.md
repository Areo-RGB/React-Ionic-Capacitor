# Claude Code Configuration

This directory contains Claude Code skills, hooks, and commands for the React + Ionic + Capacitor mobile project.

## Session Start Hook

**File:** `session-start.sh`

Automatically runs when starting a Claude Code session. It:
- Checks for installed dependencies
- Verifies Android platform setup
- Detects connected Android devices
- Displays available npm scripts
- Shows quick reference links

## Custom Slash Commands

Use these commands by typing `/command-name` in Claude Code:

### `/check-device`
Check for connected Android devices and their status via ADB.
- Shows device serial numbers and models
- Provides troubleshooting if no devices found
- Lists emulators if running

### `/run-device`
Build and run the app on a connected Android device.
- Checks for devices
- Runs full build and deployment
- Monitors for errors
- Suggests fixes for common issues

### `/view-logs`
View live logs from the connected Android device.
- Filters for relevant tags (chromium, Capacitor, Console)
- Helps identify JavaScript errors
- Detects plugin and permission issues

### `/build-apk`
Build debug or release APK for distribution.
- Guides through debug vs release selection
- Handles keystore generation for release builds
- Provides APK file location
- Shows installation commands

### `/debug-remote`
Set up Chrome DevTools for remote debugging.
- Provides step-by-step setup instructions
- Explains DevTools capabilities
- Troubleshoots connection issues
- Mentions wireless debugging option

### `/sync-android`
Sync web assets and plugins to Android platform.
- Runs build + Capacitor sync
- Explains the sync process
- Lists next steps after sync
- Helps troubleshoot sync errors

### `/test-plugins`
Guide for testing Camera Preview and Bluetooth LE plugins.
- Provides testing checklist
- Explains expected behavior
- Lists common issues and fixes
- Verifies permissions in manifest

### `/clean-rebuild`
Clean all build artifacts and rebuild from scratch.
- Cleans web, Android, and Capacitor caches
- Rebuilds everything fresh
- Useful for resolving build issues
- Explains when to use

## Usage Examples

```
# Check if device is connected
/check-device

# Run app on device
/run-device

# View device logs
/view-logs

# Build APK for sharing
/build-apk

# Debug with Chrome DevTools
/debug-remote

# Sync after code changes
/sync-android

# Test camera and Bluetooth
/test-plugins

# Fix build issues
/clean-rebuild
```

## Project-Specific Context

These commands are tailored for:
- React 19 + TypeScript + Ionic 8
- Capacitor 7 native bridge
- Tailwind CSS 4
- Camera Preview plugin (@capacitor-community/camera-preview)
- Bluetooth LE plugin (@capacitor-community/bluetooth-le)
- TensorFlow.js for ML

## Important Notes

- **Physical device required** for Camera Preview and Bluetooth LE
- Emulators don't support Bluetooth hardware
- All commands assume Android development environment is set up
- USB debugging must be enabled on device

## Documentation Links

- [PHYSICAL_DEVICE_QUICK_START.md](../PHYSICAL_DEVICE_QUICK_START.md) - Quick device setup
- [ANDROID_SETUP.md](../ANDROID_SETUP.md) - Complete Android guide
- [README.md](../README.md) - Project overview

## Adding Custom Commands

To add a new command:

1. Create a new `.md` file in `.claude/commands/`
2. Add YAML frontmatter with description:
   ```yaml
   ---
   description: Brief description of what the command does
   ---
   ```
3. Write the command instructions in markdown
4. Use the command with `/your-command-name`

## Customizing Session Hook

Edit `session-start.sh` to customize the startup behavior:
- Add environment checks
- Set up aliases
- Display project-specific reminders
- Run initialization scripts

## Best Practices

- Use `/check-device` before `/run-device`
- Use `/view-logs` when debugging issues
- Use `/sync-android` after web code changes
- Use `/clean-rebuild` for stubborn build errors
- Use `/test-plugins` to verify native features work

## Troubleshooting

If commands aren't working:
1. Ensure `.claude/commands/*.md` files have correct frontmatter
2. Check that session-start.sh is executable: `chmod +x .claude/session-start.sh`
3. Restart Claude Code session
4. Check Claude Code documentation for command syntax

## Contributing

When adding new commands:
- Keep descriptions clear and concise
- Provide step-by-step instructions
- Include troubleshooting sections
- List common issues and fixes
- Link to relevant documentation
