import { WaterMarkConfig } from '../types'
import { getTextSize, createCanvas, observeWatermark, url2img } from '../utils'

export const text2image = async (config: WaterMarkConfig) => {
  // const background = config.target as HTMLImageElement
  const {
    image,
    position,
    target,
    success,
    onerror
  } = config

  const [canvas, ctx] = createCanvas(target as HTMLImageElement)
  const { width, height } = target as HTMLImageElement

  const imageDom = await url2img(image)

  if (!imageDom) {
    throw new Error(`An error occurred while loading image (src: ${image} )`)
  }

  const { width: newImgWidth, height: newImgHeight } = imageDom

  ctx.drawImage(target as HTMLImageElement, 0, 0, width, height)

  switch (position) {
    case 'center':
      ctx.drawImage(
        imageDom,
        (width - newImgWidth) / 2,
        (height - newImgHeight) / 2,
        newImgWidth,
        newImgHeight
      )
      break
    case 'topLeft':
      ctx.drawImage(imageDom, 0, 0, newImgWidth, newImgHeight)
      break
    case 'topRight':
      ctx.drawImage(imageDom, width - newImgWidth, 0, newImgWidth, newImgHeight)
      break
    case 'bottomRight':
      ctx.drawImage(imageDom, width - newImgWidth, height - newImgHeight, newImgWidth, newImgHeight)
      break
    case 'bottomLeft':
      ctx.drawImage(imageDom, 0, height - newImgHeight, newImgWidth, newImgHeight)
      break
    default:
      let w = 0
      let h = 0
      while (h < height) {
        while (w < width) {
          ctx.drawImage(imageDom, w, h, newImgWidth, newImgHeight)
          w += newImgWidth
        }
        w = 0
        h += newImgHeight
      }
  }
  const base64 = canvas.toDataURL()
  ;(target as HTMLImageElement).src = base64
  success && success(base64)
}
