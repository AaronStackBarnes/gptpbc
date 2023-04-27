const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const clipboardy = require("clipboardy");

contextBridge.exposeInMainWorld("electron", {
  fs: {
    readFileSync: fs.readFileSync,
  },
  clipboardy: {
    writeSync: clipboardy.writeSync,
  },
});
