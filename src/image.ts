import { ImageWaterMarkConfig } from './interface'

class ImageWaterMark {
  config: ImageWaterMarkConfig

  constructor(config: ImageWaterMarkConfig) {
    this.config = config
    this.init()
  }

  init() {
    // TODO: 待完善容错处理
    const oldImgSrc = this.config.target?.src
    const url = this.config.url
    let src = ''

    if (!oldImgSrc && !url) {
      throw new Error('水印添加失败：target和url不能全为空！')
    }

    const img = new Image()
    img.setAttribute('crossorigin', 'crossorigin')

    if (oldImgSrc && url) {
      // url转换成img -> img加水印 -> img替换target
      src = url
    }
    if (!oldImgSrc && url) {
      // url转换成img -> img加水印 -> 返回img的base64
      src = url
    }
    if (oldImgSrc && !url) {
      // targe加水印 -> 替换原target
      src = oldImgSrc
    }

    this._addWatermark(img, src)
  }

  // 图片添加水印
  _addWatermark(img: HTMLImageElement, src: string) {
    img.src = src
    img.onload = () => {
      // 创建画布
      const canvas = document.createElement('canvas')
      // 绘制文字环境
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const { width, height } = img
        canvas.width = width
        canvas.height = height
        // 图片添加到canvas
        ctx.drawImage(img, 0, 0, width, height)
        // 水印添加到cancas
        this._text2canvas(ctx, width, height)
        // canvas转换成base64
        const base64 = canvas.toDataURL()
        // 替换原dom
        if (this.config.target) {
          this.config.target.src = base64
        }
        // 执行success回掉
        this.config.success(base64)
      }
    }
    img.onerror = () => {
      throw new Error(`图片加载失败：请检查src: ${src} 是否正确！`)
    }
  }

  // 水印文本添加到canvas
  _text2canvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const { position, color, fontSize, cSpace, vSpace, angle, text } = this.config

    ctx.font = `${fontSize}px microsoft yahei`
    ctx.fillStyle = color

    switch (position) {
      case 'repeat':
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const { width: textWith } = this._getTextSize(text, fontSize)
        const wmWidth = textWith + cSpace // 单个水印文字占的宽度
        const wmHeight = textWith + vSpace // 单个水印文字占的高度
        ctx.translate(width / 2, height / 2)
        ctx.rotate((Math.PI / 180) * angle)

        const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))

        let w = -diagonal / 2
        let h = -diagonal / 2

        while (h < diagonal / 2) {
          while (w < diagonal / 2) {
            ctx.fillText(text, w, h)
            w += wmWidth
          }
          w = -diagonal / 2
          h += wmHeight
        }
        break
      case 'center':
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, width / 2, height / 2)
        break
      case 'topLeft':
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText(text, 0 + cSpace, 0 + vSpace)
        break
      case 'topRight':
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
        ctx.fillText(text, width - cSpace, 0 + vSpace)
        break
      case 'bottomRight':
        ctx.textAlign = 'right'
        ctx.textBaseline = 'bottom'
        ctx.fillText(text, width - cSpace, height - vSpace)
        break
      case 'bottomLeft':
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.fillText(text, 0 + cSpace, height - vSpace)
        break
    }
  }

  // 获取文字的长宽
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

export default ImageWaterMark
