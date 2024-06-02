const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const blockIconURI = 'data:image/png;base64,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';
const formatMessage = require('format-message');

const Message = {
    connect: {
        'ja': '接続',
        'ja-Hira': 'せつぞく',
        'en': 'connect'
    },
    disconnect: {
        'ja': '切断',
        'ja-Hira': 'せつだん',
        'en': 'disconnect'
    },
    forward: {
        'ja': '前に進む',
        'ja-Hira': 'まえにすすむ',
        'en': 'forward'
    },
    right: {
        'ja': '右に曲がる',
        'ja-Hira': 'みぎにまがる',
        'en': 'right'
    },
    left: {
        'ja': '左に曲がる',
        'ja-Hira': 'ひだりにまがる',
        'en': 'left'
    },
    stop: {
        'ja': '止まる',
        'ja-Hira': 'とまる',
        'en': 'stop'
    },
    backward: {
        'ja': '後ろに進む',
        'ja-Hira': 'うしろにすすむ',
        'en': 'backward'
    },
    driveDistance: {
        'ja': '[DISTANCE] mm進む',
        'ja-Hira': '[DISTANCE] mmすすむ',
        'en': 'drive [DISTANCE] mm'
    }
};

const AvailableLocales = ['en', 'ja', 'ja-Hira'];

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://champierre.github.io/scratch2root/scratch2root.mjs';

class Scratch3Scratch2RootBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME() {
        return 'Scratch2Root';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID() {
        return 'scratch2root';
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL() {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor (runtime) {
        this.runtime = runtime;
        this.rxChar = null;
    }

    getInfo () {
        this.locale = this.setLocale();

        return {
            id: Scratch3Scratch2RootBlocks.EXTENSION_ID,
            name: Scratch3Scratch2RootBlocks.EXTENSION_NAME,
            extensionURL: Scratch3Scratch2RootBlocks.extensionURL,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: Message.connect[this.locale]
                },
                {
                    opcode: 'disconnect',
                    blockType: BlockType.COMMAND,
                    text: Message.disconnect[this.locale]
                },
                {
                    opcode: 'driveDistance',
                    blockType: BlockType.COMMAND,
                    text: Message.driveDistance[this.locale],
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'forward',
                    blockType: BlockType.COMMAND,
                    text: Message.forward[this.locale]
                },
                {
                    opcode: 'right',
                    blockType: BlockType.COMMAND,
                    text: Message.right[this.locale]
                },
                {
                    opcode: 'left',
                    blockType: BlockType.COMMAND,
                    text: Message.left[this.locale]
                },
                {
                    opcode: 'backward',
                    blockType: BlockType.COMMAND,
                    text: Message.backward[this.locale]
                },
                {
                    opcode: 'stop',
                    blockType: BlockType.COMMAND,
                    text: Message.stop[this.locale]
                }
            ],
            menus: {
            }
        };
    }

    async connect () {
        const ROOT_SERVICE_UUID = '48c5d828-ac2a-442d-97a3-0c9822b04979';
        const DEVICE_INFORMATION_SERVICE = '0000180a-0000-1000-8000-00805f9b34fb';
        const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
        const TX_CHAR_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
        const RX_CHAR_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

        if (!navigator.bluetooth) {
            console.log('Web Bluetooth API is not supported by this browser.');
            return;
        }

        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{
                    services: [ROOT_SERVICE_UUID]
                }],
                optionalServices: [DEVICE_INFORMATION_SERVICE, UART_SERVICE]
            });

            const server = await device.gatt.connect();
            console.log('Connected to GATT server');

            const service = await server.getPrimaryService(UART_SERVICE);
            console.log('Service found:', service.uuid);

            const rxChar = await service.getCharacteristic(RX_CHAR_UUID);
            this.rxChar = rxChar;
            console.log('Characteristic found:', rxChar.uuid);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    disconnect () {
        console.log('disconnect');
    }

    async forward () {
        console.log('forward');

        const value = new Uint8Array([
            0x01, 0x04, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00,
            0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0xD1
        ]);

        await this.rxChar.writeValue(value);
    }

    async right () {
        console.log('right');

        const value = new Uint8Array([
            0x01, 0x04, 0x00, 0x00, 0x00, 0x00, 0x64, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x25
        ]);

        await this.rxChar.writeValue(value);
    }

    async left () {
        console.log('left');

        const value = new Uint8Array([
            0x01, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x8A
        ]);

        await this.rxChar.writeValue(value);
    }

    async stop () {
        console.log('stop');

        const value = new Uint8Array([
            0x01, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x7E
        ]);

        await this.rxChar.writeValue(value);
    }

    async backward () {
        console.log('backward');

        const value = new Uint8Array([
            0x01, 0x04, 0x00, 0xFF, 0xFF, 0xFF, 0x9C, 0xFF,
            0xFF, 0xFF, 0x9C, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x71
        ]);

        await this.rxChar.writeValue(value);
    }

    async driveDistance (args) {
        console.log('driveDistance');
        const distance = Cast.toNumber(args.DISTANCE);
        const value = this.setDistance(distance);

        await this.rxChar.writeValue(this.appendCrc(value));
    }

    generateCrc8Table () {
        const polynomial = 0x07;
        const table = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            let crc = i;
            for (let j = 0; j < 8; j++) {
                if (crc & 0x80) {
                    crc = (crc << 1) ^ polynomial;
                } else {
                    crc <<= 1;
                }
            }
            table[i] = crc & 0xFF;
        }
        return table;
    }

    crc8 (data) {
        let crc = 0x00; // Initial value
        for (let i = 0; i < data.length; i++) {
            const byte = data[i];
            crc = this.crcTable[(crc ^ byte) & 0xFF];
        }
        return crc;
    }

    appendCrc (value) {
        const newValue = new Uint8Array(value.length + 1);
        newValue.set(value);
        newValue[19] = this.crc8(value);
        return newValue;
    }


    setDistance (distance) {
        const arr = new Uint8Array(19);
        arr[0] = 1;
        arr[1] = 8;
        arr[2] = 0;
        arr[3] = (distance >> 24) & 0xFF;
        arr[4] = (distance >> 16) & 0xFF;
        arr[5] = (distance >> 8) & 0xFF;
        arr[6] = distance & 0xFF;
        return arr;
    }

    /**
     * Get locale for message text.
     * @return {string} - Locale of this editor.
     */
    setLocale () {
        const locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        }
        return 'en';
    }
}

exports.blockClass = Scratch3Scratch2RootBlocks; // loadable-extension needs this line.
module.exports = Scratch3Scratch2RootBlocks;
