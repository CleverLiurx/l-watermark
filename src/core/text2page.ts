import { WaterMarkConfig } from '../types'
import { getTextSize, createWatermark, observeWatermark, Guard } from '../utils'

/**
 * @description 向页面中添加文字水印
 * @param config 水印配置
 * @return 监视器observe
 */

export const text2page: (config: WaterMarkConfig) => Guard =(config) => {
  const canvas = document.createElement('canvas')
  const { width, height } = getTextSize(config.text, config.fontSize)
  const ctx = canvas.getContext('2d')

  const dpr = window.devicePixelRatio || 1
  canvas.width = (width + config.cSpace) * dpr
  canvas.height = (width + config.vSpace) * dpr

  if (!ctx) {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  ctx.font = `${config.fontSize}px Microsoft YaHei`
  ctx.fillStyle = config.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * config.angle)
  ctx.scale(dpr, dpr)
  ctx.fillText(config.text, 0, 0)

  config.imageWidth = canvas.width / dpr
  config.imageHeight = canvas.height / dpr
  config.image = canvas.toDataURL()

  const watermark = createWatermark(config)
  const observe = observeWatermark(watermark, config)
  return observe
}
