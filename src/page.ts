import GuardDom from './guard-dom'
import { PageConfig } from './interface'
import { getTextSize, ErrorMsg, url2img } from './utils'

class PageWaterMark {
  watermakr: HTMLDivElement = document.createElement('div')
  config: PageConfig.Image | PageConfig.Text
  guardDom?: GuardDom

  constructor(config: PageConfig.Image | PageConfig.Text, wmType: 'image' | 'text') {
    this.config = config

    if (wmType === 'image') {
      this.createImageWatermark()
    } else {
      this.createTextWatermark()
    }
  }

  remove() {
    this.guardDom?.stop()
    this.watermakr?.remove()
  }

  // 添加图片水印到页面
  createImageWatermark() {
    const { image } = this.config as PageConfig.Image
    this._addWatermark2Container(image)
    this._observeWaterMark()
  }

  // 创建一个的水印图片
  createTextWatermark() {
    const config = this.config as PageConfig.Text

    const canvas = document.createElement('canvas')
    const { width, height } = getTextSize(config.text, config.fontSize)
    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    canvas.width = (width + config.cSpace) * dpr
    canvas.height = (width + config.vSpace) * dpr

    if (ctx) {
      ctx.font = `${config.fontSize}px Microsoft YaHei`
      ctx.fillStyle = config.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((Math.PI / 180) * config.angle)
      ctx.scale(dpr, dpr)
      ctx.fillText(config.text, 0, 0)
    } else {
      throw ErrorMsg.NoSupportCanvas()
    }

    const base64 = canvas.toDataURL()
    this._addWatermark2Container(base64, canvas.width / dpr, canvas.height / dpr)
    this._observeWaterMark()
  }

  // 将水印文字图片重复平铺到容器
  _addWatermark2Container(imgUrl: string, width?: number, height?: number) {
    this.watermakr.className = 'l-watermark'

    const wmStyle: { [key: string]: string } = {
      'background-image': `url(${imgUrl})`,
      'position': this.config.target === document.body ? 'fixed' : 'absolute',
      'top': '0px',
      'right': '0px',
      'bottom': '0px',
      'left': '0px',
      'pointer-events': 'none',
      'background-repeat': 'repeat',
      'background-size': `${width}px ${height}px`,
      'z-index': this.config.zIndex,
      'display': 'block',
    }

    let style = ''
    for (let key in wmStyle) {
      style += `${key}: ${wmStyle[key]} !important; `
    }

    this.watermakr.setAttribute('style', style);
    this.config.target.style.position = 'relative'
    this.config.target.appendChild(this.watermakr)
  }

  // 监视水印不被改变
  _observeWaterMark() {
    const { onchange, success } = this.config
    this.guardDom = new GuardDom(this.watermakr, onchange)
    this.guardDom?.start()
    success && success()
  }
}

export default PageWaterMark
