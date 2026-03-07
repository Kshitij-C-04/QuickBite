const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix import.meta issues (Expo Web fix)
config.resolver.unstable_enablePackageExports = false;

// Apply NativeWind
module.exports = withNativeWind(config, { input: "./app/globals.css" });