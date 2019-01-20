const electron = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");
const { app, BrowserWindow, Menu, Tray, dialog } = electron;
const log = require("electron-log");
const iconPath = path.join(__dirname, "./app/images/icons/win/logo.ico");
let mainWindow,
  tray = null;

var info = {
  version: "5.0.1",
  date: "18-12-2018 21:25 PM",
  electronVersion: "4.0.1"
};

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

// Check for Update
autoUpdater.on("checking-for-update", () => {
  dialog.showMessageBox({
    title: "Lone",
    message: "Checking for Update",
    icon: iconPath
  });
});

autoUpdater.on("update-available", info => {
  dialog.showMessageBox({
    title: "Lone",
    message: `A new update is ready to install
       Version ${
         info.version
       } is downloaded and will be automatically installed.`,
    buttons: ["OK"],
    icon: iconPath
  });
});

autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox({
    title: "Lone",
    message: "There is no update Currently",
    buttons: ["OK"],
    icon: iconPath
  });
});

autoUpdater.on("update-downloaded", info => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on("error", error => {
  dialog.showMessageBox({
    title: "Lone",
    message: error,
    buttons: ["OK"],
    icon: iconPath
  });
});
// End of Check for Update

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: iconPath,
    // Remove if not working
    webPreferences: {
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    },
    titleBarStyle: "hidden",
    show: false
    // Remove End
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/app/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.on("close", () => {
    app.quit();
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.maximize();
  // Menu Start
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  tray = new Tray(iconPath);
  tray.setContextMenu(trayMenu);
  tray.setToolTip("Lone");
  tray.on("click", function() {
    if (mainWindow.isMinimized()) {
      mainWindow.maximize();
    } else {
      mainWindow.minimize();
    }
  });
  // Menu End
  if (isDev) mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});
function settings() {}

function showAbout() {
  dialog.showMessageBox({
    title: "About",
    message: `Lone a Saverl Inc. Product
                
      Version: ${info.version}
      Date: ${info.date}
      Electron: ${info.electronVersion}
      OS: ${process.platform}`,
    icon: iconPath
  });
}

const trayMenuTemplate = [
  {
    label: "Show/Hide Lone",
    click() {
      if (mainWindow.isMinimized()) {
        mainWindow.maximize();
        // mainWindow.
      } else {
        mainWindow.minimize();
      }
    }
  },
  {
    label: "Settings",
    click() {
      if (mainWindow.isMinimized()) {
        mainWindow.maximize();
      }
      settings();
    }
  },
  {
    type: "separator"
  },
  {
    label: "Exit",
    click() {
      app.quit();
    }
  }
];

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        role: "reload"
      },
      {
        type: "separator"
      },
      {
        label: "Settings",
        accelerator: "CmdOrCtrl+,",
        click: settings
      },
      {
        type: "separator"
      },
      {
        label: "Exit",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo"
      },
      {
        role: "redo"
      }
    ]
  },
  {
    role: "Window",
    submenu: [
      {
        role: "minimize"
      }
    ]
  },
  {
    role: "Help",
    submenu: [
      {
        label: "Documentation",
        click() {
          electron.shell.openExternal(
            "https://www.saverl.com/youdownloader/documentation"
          );
        }
      },
      {
        type: "separator"
      },
      {
        label: "View Licence",
        click() {
          electron.shell.openExternal(
            "https://www.saverl.com/youdownloader/licence"
          );
        }
      },
      {
        type: "separator"
      },
      {
        label: "Check for Updates...",
        accelerator: "Alt+U",
        click() {
          autoUpdater.checkForUpdates();
        }
      },
      {
        type: "separator"
      },
      {
        label: "Learn More",
        click() {
          electron.shell.openExternal(
            "https://www.saverl.com/youdownloader/help"
          );
        }
      },
      {
        label: "About",
        click() {
          showAbout();
        }
      }
    ]
  }
];

if (process.platform == "darwin") mainMenuTemplate.unshift({});
