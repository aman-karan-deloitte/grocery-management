module.exports = {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(nanoid|uuid)/)',
    ],
  };