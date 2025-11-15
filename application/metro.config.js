const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// Tell Metro to watch workspace packages
config.watchFolders = [
  path.resolve(workspaceRoot, "packages")
];

// Ensure Metro resolves dependencies from root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
];

module.exports = config;
