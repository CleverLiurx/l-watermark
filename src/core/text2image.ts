import { WaterMarkConfig } from '../types'
import { getTextSize, createCanvas } from '../utils'

/**
 * @description 向图片中添加文字水印
 * @param config 水印配置
 */

export const text2image: (config: WaterMarkConfig) => void = (config) => {
  if (config.secret) {
    // 暗水印
    drawEncryptedText(config)
  } else {
    // 明水印
    drawSurfaceText(config)
  }
}

const drawEncryptedText: (config: WaterMarkConfig) => void = (config) => {
  const [canvas, ctx] = createCanvas(config.target as HTMLImageElement)
  const { width, height } = canvas

  const targetImageData = ctx.getImageData(0, 0, width, height)
  const textImageData = _getTextImageData(config, width, height)
  const watermarkImageData = _mergeImageData(targetImageData, textImageData)
  ctx.putImageData(watermarkImageData, 0, 0)
  const base64 = canvas.toDataURL()
  ;(config.target as HTMLImageElement).src = base64
  config.success && config.success(base64)
}

const drawSurfaceText: (config: WaterMarkConfig) => void = (config) => {
  const [canvas, ctx] = createCanvas(config.target as HTMLImageElement)
  const [textCanvas] = _drawTextToCanvas(canvas, config)
  const base64 = textCanvas.toDataURL()
  ;(config.target as HTMLImageElement).src = base64
  config.success && config.success(base64)
}

const _getTextImageData: (config: WaterMarkConfig, width: number, height: number) => ImageData = (
  config,
  width,
  height
) => {
  let data = new ImageData(1, 1)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  const [textCanvas, textCtx] = _drawTextToCanvas(canvas, config)
  data = textCtx.getImageData(0, 0, width, height)

  return data
}

const _mergeImageData: (targetData: ImageData, textData: ImageData) => ImageData = (
  targetData,
  textData
) => {
  const oData = targetData.data
  const tData = textData.data

  let bit = 0
  let offset = 3

  // switch (rgb) {
  //   case 'G':
  //     bit = 1
  //     offset = 2
  //     break
  //   case 'B':
  //     bit = 2
  //     offset = 1
  //     break
  //   default:
  //     bit = 0
  //     offset = 3
  // }

  for (let i = 0; i < oData.length; i++) {
    if (i % 4 === bit) {
      // 对目标通道：文字为空的地方 原图处理为偶数；文字不为空的地方，原图处理为奇数
      if (tData[i + offset] === 0 && oData[i] % 2 === 1) {
        // 文字为空为原图为奇数 -> 变为偶数
        if (oData[i] === 255) {
          oData[i]--
        } else {
          oData[i]++
        }
      } else if (tData[i + offset] !== 0 && oData[i] % 2 === 0) {
        // 文字不为空，原图为偶数 -> 变为奇数
        oData[i]++
      }
    }
  }

  return targetData
}

const _drawTextToCanvas: (
  canvas: HTMLCanvasElement,
  config: WaterMarkConfig
) => [HTMLCanvasElement, CanvasRenderingContext2D] = (canvas, config) => {
  const { position, color, fontSize, cSpace, vSpace, angle, text } = config
  const targetClone = canvas.cloneNode(true) as HTMLCanvasElement
  const { width, height } = targetClone
  const ctx = targetClone.getContext('2d')

  if (!ctx) {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  ctx.font = `${fontSize}px microsoft yahei`
  ctx.fillStyle = color

  switch (position) {
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
    default:
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const { width: textWith } = getTextSize(text, fontSize)
      const wmWidth = textWith + cSpace
      const wmHeight = textWith + vSpace
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
  }

  return [targetClone, ctx]
}
