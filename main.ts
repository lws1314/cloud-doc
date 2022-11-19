const {app, ipcMain} = require("electron")
const isDev = require('electron-is-dev')
const path = require('path')
const AppWindow = require('./src/AppWindow')
app.on('ready', () => {
    const mainWindowConfig = {
        fullscreen: true,
        webPreferences: {
            enableRemoteModule: true,// 使用 remote 需要开启 remote node 的api 用来获取 磁盘路径
            preload: path.join(__dirname, 'preload.ts'),
            contextIsolation: false,  //  把这一项加上错误就会消失
            nodeIntegration: true, // 表示在electron 可以使用node.js 函数
        }
    }
    const urlLocation = isDev ? 'http://127.0.0.1:3000' : `file://${path.join(__dirname, './index.html')}`
    let mainWindow = new AppWindow(mainWindowConfig, urlLocation)
    // 打开 调试创建
    mainWindow.webContents.openDevTools()
    // 主进程接收 子进程发送的信息 关闭窗口
    ipcMain.on('close', () => {
        if (mainWindow) {
            mainWindow.close()
        }
    });


    // let mainWindow = new BrowserWindow({
    //     width: 1050,
    //     height: 700,
    //     minWidth: 1050,
    //     minHeight: 700,
    //     fullscreen: true,
    //     webPreferences: {
    //         enableRemoteModule: true,// 使用 remote 需要开启 remote node 的api 用来获取 磁盘路径
    //         preload: path.join(__dirname, 'preload.ts'),
    //         contextIsolation: false,  //  把这一项加上错误就会消失
    //         nodeIntegration: true, // 表示在electron 可以使用node.js 函数
    //     }
    // });
    // // 主进程接收 子进程发送的信息 关闭窗口
    // ipcMain.on('close', () => {
    //     mainWindow.close()
    //     mainWindow = null;
    // });
    // // 启用 remote
    // remote.enable(mainWindow.webContents)
    // mainWindow.webContents.openDevTools();
    // const urlLocation = isDev ? 'http://127.0.0.1:3000' : `file://${path.join(__dirname, './index.html')}`
    // mainWindow.loadURL(urlLocation)
    //
    // mainWindow.once('ready-to-show', () => {
    //     mainWindow.show()
    // })
})
