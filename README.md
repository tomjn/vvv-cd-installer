A WIP VVV installer that uses the contents of a USB drive to get a working contributor day install.

## Usage Instructions

```
npm install
npm run build
npm run start
```

## Development

You can make babel watch for changes and re-transpile the sources via

```
npm run watch
```

## Packaging The App

Grab `electron-packager` and run the following:

```
electron-package . --all
```

You will need Wine installed if you're not on Windows to generate Windows builds. Each build will be placed in a subfolder with the appropriate name.