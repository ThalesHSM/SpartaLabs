module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          alias: {
            "@src": "./src",
            "@api": "./src/api",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
