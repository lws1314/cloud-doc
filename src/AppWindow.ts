const {BrowserWindow} = require('electron')

class AppWindow extends BrowserWindow {
    /**
     *
     * @param config 配置信息
     * @param urlLocation url
     */
    constructor(config: object, urlLocation: string) {
        // 默认配置信息
        const basicConfig = {
            webPreferences: {
                nodeIntegration: true,
            },
            show: false,
            backgroundColor: '#efefef',
        }
        // config 有配置的值 覆盖  basicConfig 中的参数 得到一个新的配置项
        const finalConfig = {...basicConfig, ...config}
        super(finalConfig)
        this.loadURL(urlLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}
// 导出 class 类 request 导出的方式
module.exports = AppWindow