import { WaterMarkConfig } from '../types'
import { createCanvas, createImage } from '../utils'

export const image2image = async (config: WaterMarkConfig) => {
  // const background = config.target as HTMLImageElement
  const { image, position, target, success, onerror } = config

  const [canvas, ctx] = createCanvas(target as HTMLImageElement)
  const { width, height } = target as HTMLImageElement

  const imageDom = await createImage(image)

  const { width: imageDomWidth, height: imageDomHeight } = imageDom

  ctx.drawImage(target as HTMLImageElement, 0, 0, width, height)

  switch (position) {
    case 'center':
      ctx.drawImage(
        imageDom,
        (width - imageDomWidth) / 2,
        (height - imageDomHeight) / 2,
        imageDomWidth,
        imageDomHeight
      )
      break
    case 'topLeft':
      ctx.drawImage(imageDom, 0, 0, imageDomWidth, imageDomHeight)
      break
    case 'topRight':
      ctx.drawImage(imageDom, width - imageDomWidth, 0, imageDomWidth, imageDomHeight)
      break
    case 'bottomRight':
      ctx.drawImage(
        imageDom,
        width - imageDomWidth,
        height - imageDomHeight,
        imageDomWidth,
        imageDomHeight
      )
      break
    case 'bottomLeft':
      ctx.drawImage(imageDom, 0, height - imageDomHeight, imageDomWidth, imageDomHeight)
      break
    default:
      let w = 0
      let h = 0
      while (h < height) {
        while (w < width) {
          ctx.drawImage(imageDom, w, h, imageDomWidth, imageDomHeight)
          w += imageDomWidth
        }
        w = 0
        h += imageDomHeight
      }
  }

  const base64 = canvas.toDataURL()
  ;(target as HTMLImageElement).src = base64
  success && success(base64)
}
