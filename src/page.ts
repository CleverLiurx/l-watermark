import GuardDom from './guard-dom'
import { PageWaterMarkConfig } from './interface'

class PageWaterMark {
  singleImg: string = ''
  watermakr: HTMLDivElement = document.createElement('div')
  config: PageWaterMarkConfig

  constructor(config: PageWaterMarkConfig) {
    this.config = config
    this.createSingleWatermarkImage()
    this.repeatWatermark2Container()
    this.observeWaterMark()
  }
  // 创建一个的水印图片
  createSingleWatermarkImage() {
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

  // 将水印文字图片重复平铺到容器
  repeatWatermark2Container() {
    this.watermakr.className = 'l-watermark'
    this.watermakr.style.backgroundImage = `url(${this.singleImg})`
    this.watermakr.style.position = this.config.containerEl === document.body ? 'fixed' : 'absolute'
    this.watermakr.style.top = '0px'
    this.watermakr.style.right = '0px'
    this.watermakr.style.bottom = '0px'
    this.watermakr.style.left = '0px'
    this.watermakr.style.pointerEvents = 'none'
    this.watermakr.style.backgroundRepeat = 'repeat'
    this.watermakr.style.zIndex = this.config.zIndex
    this.config.containerEl.style.position = 'relative'
    this.config.containerEl.appendChild(this.watermakr)
  }

  // 监视水印不被改变
  observeWaterMark() {
    const observe = new GuardDom(this.watermakr, this.config.onchange)
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

export default PageWaterMark
