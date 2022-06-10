import GuardDom from './guard-dom'
enum WaterMarkModel {
  online = 'online',
  offline = 'offline',
}

interface WaterMarkConfig {
  model: WaterMarkModel // 模式
  systemId: string // 系统id
  userId: string // 用户id
  text: string // 水印文字
  containerEl: HTMLElement // 添加水印的目标元素
  color: string // 水印字体颜色rgba
  fontSize: number // 水印字体大小
  zIndex: number // 层级
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  angle: number // 水印旋转角度
}

interface UserWaterMarkConfig {
  model?: WaterMarkModel
  systemId?: string
  userId: string
  text: string
  containerEl?: HTMLElement
  color?: string
  fontSize?: number
  zIndex?: number
  cSpace?: number
  vSpace?: number
  angle?: number
}

const defaultConfig: WaterMarkConfig = {
  model: WaterMarkModel.offline,
  systemId: '1000',
  userId: '5yJesusZGMVq4px',
  containerEl: document.body,
  text: '默认水印',
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 24,
  zIndex: 10000,
  cSpace: 0,
  vSpace: 0,
  angle: -25,
}

class WaterMark {
  singleImg: string = ''
  watermakr: HTMLDivElement = document.createElement('div')
  config: WaterMarkConfig = { ...defaultConfig }

  constructor(config: UserWaterMarkConfig) {
    this._setConfig(config)
    this._createSingleImg()
    this._addWaterMark()
    this._observeWaterMark()
  }

  // 初始化配置
  _setConfig(config: UserWaterMarkConfig) {
    this.config = { ...defaultConfig, ...config }
    if (this.config.model === WaterMarkModel.online) {
      // TODO1: 通过systemId和userId生成新的水印文字text
      if (!config.text) {
        this.config.text = '模拟水印'
      }
      // TODO2: 水印dom被改变时候请求安全接口
    }
  }

  // 创建单个的水印图片
  _createSingleImg() {
    // 创建画布
    const canvas = document.createElement('canvas')
    // 绘制文字环境
    const context = canvas.getContext('2d')
    if (context) {
      // 获取字体宽度
      const { width, height } = this._getTextSize(this.config.text, this.config.fontSize)
      // 画布宽度
      canvas.width = width + this.config.cSpace
      // 画布高度
      canvas.height = width + this.config.vSpace
      // 设置字体
      context.font = `${this.config.fontSize}px Microsoft YaHei`
      // 设置字体颜色
      context.fillStyle = this.config.color
      // 设置水平对齐方式
      context.textAlign = 'center'
      // 设置垂直对齐方式
      context.textBaseline = 'middle'
      // 旋转
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate((Math.PI / 180) * this.config.angle)
      // 填充文字
      context.fillText(this.config.text, 0, 0)
    } else {
      throw new Error('水印创建失败: 当前浏览器不支持canvas')
    }

    // 转换成base64
    this.singleImg = canvas.toDataURL()
  }

  // 添加水印
  _addWaterMark() {
    this.watermakr.className = 'l-watermark'
    this.watermakr.style.backgroundImage = `url(${this.singleImg})`
    this.watermakr.style.position = this.config.containerEl === document.body ? 'fixed' : 'absolute'
    this.watermakr.style.top = '0px'
    this.watermakr.style.right = '0px'
    this.watermakr.style.bottom = '0px'
    this.watermakr.style.left = '0px'
    this.watermakr.style.pointerEvents = 'none'
    this.watermakr.style.backgroundRepeat = 'repeat'
    this.config.containerEl.style.position = 'relative'
    this.config.containerEl.appendChild(this.watermakr)
  }

  _observeWaterMark() {
    const observe = new GuardDom(this.watermakr)
    observe.start()
  }

  // 获取水印文字的长宽
  _getTextSize(text: string, fontSize: number) {
    const span = document.createElement('span')
    const result: { width: number; height: number } = { width: 0, height: 0 }
    result.width = span.offsetWidth
    result.height = span.offsetWidth
    span.style.visibility = 'hidden'
    span.style.fontSize = fontSize + 'px'
    document.body.appendChild(span)
    if (span.textContent) {
      span.textContent = text
    } else {
      span.innerText = text
    }
    result.width = span.offsetWidth - result.width
    result.height = span.offsetHeight - result.height
    span.parentNode?.removeChild(span)
    return result
  }
}

export default WaterMark