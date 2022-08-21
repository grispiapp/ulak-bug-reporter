#!/usr/bin/env node

require('esbuild').buildSync({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'esm',
  minify: true,
  outfile: 'dist/ulak.js',
  sourcemap: true,
});
