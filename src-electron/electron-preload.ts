/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

// const { contextBridge } = require('electron');
// const { totalmem } = require('os');

// const API = {
//   // cpus: cpus(),
//   getMemory: () => totalmem(),
//   getMemorys: 1000,
// };

// contextBridge.exposeInMainWorld('api', {
//   API,
// });
