# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scratch2Root is a Scratch extension that enables controlling Root Robot through Scratch programming blocks. It's built as a loadable extension for Scratch using the Xcratch framework and integrates with both scratch-vm (virtual machine) and scratch-gui (user interface).

## Architecture

The project follows the standard Scratch extension architecture with these key components:

- **scratch-vm/src/extensions/scratch3_scratch2root/index.js**: Core extension logic containing block definitions and Root Robot communication via Web Bluetooth API
- **scratch-gui/src/lib/libraries/extensions/scratch2root/**: GUI assets including extension icons and metadata
- **install.sh**: Installation script that integrates the extension into a Scratch environment
- **scripts/build.js**: Custom build script referenced in package.json

### Extension Structure

The extension implements a Scratch3 blocks class (`Scratch3Scratch2RootBlocks`) that:
- Defines robot control blocks (connect, forward, backward, left, right, stop, driveDistance, rotate)
- Handles Web Bluetooth communication with Root Robot
- Implements CRC8 checksum for data integrity
- Supports multi-language block text (Japanese, English)

## Development Commands

### Building
```bash
npm run build
```
This runs the custom build script that bundles the extension using Rollup.

### Installation in Scratch Environment
```bash
sh ./install.sh
```
This script integrates the extension into an existing Scratch-gui installation by:
- Copying extension files to the appropriate directories
- Modifying extension-manager.js to register the extension
- Updating the GUI's extension index

## Key Development Notes

- The extension uses Web Bluetooth API to communicate with Root Robot over the UART service
- Block commands are converted to binary protocols with CRC8 checksums
- The build process uses Rollup with Babel for ES6+ transpilation
- Extension follows the loadable-extension pattern required by Xcratch
- All robot commands use specific byte arrays for the Root Robot's protocol

## Extension Integration

When working with this codebase, note that it's designed to be integrated into a larger Scratch environment. The extension files are structured to be copied into node_modules/scratch-vm and src/lib/libraries/extensions during installation.