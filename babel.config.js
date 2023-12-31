module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
    development: {
      plugins: ['react-native-reanimated/plugin'],
    },
  },
  plugins: ['react-native-reanimated/plugin', 'module:react-native-dotenv'],
};
