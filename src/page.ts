import GuardDom from './guard-dom'
import { Text2Page, Image2Page, ErrorType } from './interface'
import { url2base64 } from './utils'

class PageWaterMark {
  watermakr: HTMLDivElement = document.createElement('div')
  config: Text2Page | Image2Page

  constructor(config: Text2Page | Image2Page) {
    this.config = config
    let imgFlag = false

    // 断言在编译为js后无效
    if (config as Image2Page) {
      const { image } = config as Image2Page
      imgFlag = !!image
    }
    imgFlag ? this.image2WatermarkImage() : this.text2WatermarkImage()
  }

  async image2WatermarkImage() {
    const config = this.config as Image2Page
    let base64 = ''

    if (/^data:image\/.*;base64,/.test(config.image) === true) {
      base64 = config.image
    } else {
      base64 = await url2base64(config.image, config.cSpace, config.vSpace)
      if (!base64) {
        const err: ErrorType = {
          code: 1001,
          message: '水印加载失败！',
          reason: '水印图片url转base64失败',
        }
        config.onerror && config.onerror(err)
      }
    }
    this.repeatWatermark2Container(base64)
    this.observeWaterMark()
  }

  // 创建一个的水印图片
  text2WatermarkImage() {
    const config = this.config as Text2Page
    // 创建画布
    const canvas = document.createElement('canvas')
    // 绘制文字环境
    const context = canvas.getContext('2d')
    if (context) {
      // 获取字体宽度
      const { width, height } = this._getTextSize(config.text, config.fontSize)
      // 画布宽度
      canvas.width = width + config.cSpace
      // 画布高度
      canvas.height = width + config.vSpace
      // 设置字体
      context.font = `${config.fontSize}px Microsoft YaHei`
      // 设置字体颜色
      context.fillStyle = config.color
      // 设置水平对齐方式
      context.textAlign = 'center'
      // 设置垂直对齐方式
      context.textBaseline = 'middle'
      // 旋转
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate((Math.PI / 180) * config.angle)
      // 填充文字
      context.fillText(config.text, 0, 0)
    } else {
      const err: ErrorType = {
        code: 1001,
        message: '水印创建失败！',
        reason: '当前浏览器不支持canvas',
      }
      config.onerror && config.onerror(err)
    }

    // 转换成base64
    const base64 = canvas.toDataURL()

    this.repeatWatermark2Container(base64)
    this.observeWaterMark()
  }

  // 将水印文字图片重复平铺到容器
  repeatWatermark2Container(base64: string) {
    this.watermakr.className = 'l-watermark'
    this.watermakr.style.backgroundImage = `url(${base64})`
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
    const observe = new GuardDom(
      this.watermakr,
      this.config.onchange,
      this.config.success,
      this.config.onerror
    )
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
