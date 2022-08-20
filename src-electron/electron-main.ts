/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('remote-debugging-port', '8315');
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, './electron-preload.ts'),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async (interaction: any) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(
//   'MTAwNjM2NDY3NTA1MjY3OTE3OQ.GJ1aXz.tH-7fby0kNhj2PxfQ2Zm6w1RHyN8gVogfeidtQ'
// );

const express = require('express');
const cors = require('cors');
const apps = express();
apps.use(express.json());

apps.use(cors());

apps.get('/test', (req: any, res: any) => {
  res.status(200).json({ result: 'hola mundo' });
});

apps.listen(3000, () => {
  console.log('servidor inicializado');
});
