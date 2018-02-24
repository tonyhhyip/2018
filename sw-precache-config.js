module.exports = {
  cacheId: 'hkoscon-2018',
  filename: 'service-worker.js',
  minify: true,
  navigateFallback: '/2018/index.html',
  staticFileGlobsIgnorePatterns: [],
  staticFileGlobs: [
    'public/**/*.*',
    'public/index.html',
    'public/cfc.html',
    'public/cfp.html',
  ],
  stripPrefixMulti: {
    public: '/2018',
  },
  verbose: true,
  runtimeCaching: [
    {
      urlPattern: /(?:)/,
      handler: 'fastest',
    },
  ],
};
