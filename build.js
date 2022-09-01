#!/usr/bin/env node

require('esbuild').buildSync({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'cjs',
  minify: true,
  outfile: 'dist/ulak.js',
  sourcemap: true,
});

/*
import { buildSync} from "esbuild";

buildSync({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'cjs',
  minify: true,
  outfile: 'dist/ulak.js',
  sourcemap: true,
});
 */
