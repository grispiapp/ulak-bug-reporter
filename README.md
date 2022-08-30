== Build & Publish the lib

Update version in:

* `version.js`
* `package.json`

and then run:

```
yarn build
```

Then it's at `dist/ulak.js`;

To initialize the lib:

```
ulak.interceptConsole();
```

If you set `window.ulakDebug = true` then Ulak logs its own debug logs with `Ulak` prefix to the console.

For development:

```
yarn dev
```

then serve the `index.html` via a web server.
