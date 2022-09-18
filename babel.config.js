module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            api: './src/api',
            features: './src/features',
            types: './src/types',
            tabs: './src/tabs',
            store: './src/store',
            config: './src/config',
            screens: './src/screens',
            components: './src/components',
            hooks: './src/hooks',
            constants: './src/constants',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
