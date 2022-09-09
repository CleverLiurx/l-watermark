import { WaterMarkConfig } from '../types'
import { getTextSize, drawWatermark, observeWatermark, url2img } from '../utils'

export const text2image = async (config: WaterMarkConfig) => {
  const { image, position, target, success, onerror, imageWidth, imageHeight } = config
    const img = await url2img(image, imageWidth, imageHeight)
    if (!img) {
      onerror && onerror(`An error occurred while loading image (src: ${image} )`)
      return
    }

    const { width: newImgWidth, height: newImgHeight } = img
    const { width, height } = this.canvas

    const ctx = this.canvas.getContext('2d')

    if (ctx) {
      switch (position) {
        case 'center':
          ctx.drawImage(
            img,
            (width - newImgWidth) / 2,
            (height - newImgHeight) / 2,
            newImgWidth,
            newImgHeight
          )
          break
        case 'topLeft':
          ctx.drawImage(img, 0, 0, newImgWidth, newImgHeight)
          break
        case 'topRight':
          ctx.drawImage(img, width - newImgWidth, 0, newImgWidth, newImgHeight)
          break
        case 'bottomRight':
          ctx.drawImage(img, width - newImgWidth, height - newImgHeight, newImgWidth, newImgHeight)
          break
        case 'bottomLeft':
          ctx.drawImage(img, 0, height - newImgHeight, newImgWidth, newImgHeight)
          break
        default:
          let w = 0
          let h = 0
          while (h < height) {
            while (w < width) {
              ctx.drawImage(img, w, h, newImgWidth, newImgHeight)
              w += newImgWidth
            }
            w = 0
            h += newImgHeight
          }
      }
      const base64 = this.canvas.toDataURL()
      ;(target as HTMLImageElement).src = base64
      success && success(base64)
    } else {
      throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
    }
}
