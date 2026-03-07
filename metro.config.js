const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

let config = getDefaultConfig(__dirname);

// Apply Sentry config
config = getSentryExpoConfig(__dirname);

// Fix import.meta issues (important for Expo Web)
config.resolver.unstable_enablePackageExports = false;

// Apply NativeWind
config = withNativeWind(config, { input: "./app/globals.css" });

module.exports = config;