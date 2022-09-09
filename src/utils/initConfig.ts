import { WaterMarkConfig, UserWaterMarkConfig } from '../types'
import { url2img } from './url2img'

export const fillConfig: (config: UserWaterMarkConfig) => Promise<WaterMarkConfig> = async (
  config
) => {
  // typeof config.target === 'string' => 图片的url => 给图片加水印 => url转HTMLImageElement
  if (typeof config.target === 'string') {
    const dom = await url2img(config.target)
    if (!dom) {
      throw new Error(`An error occurred while loading image (src: ${config.target} )`)
    }
    config.target = dom
  }

  const configs: WaterMarkConfig = {
    target: config.target,
    text: config.text || 'Sample Text',
    image: config.image || '',
    imageWidth: (config.imageWidth && Number(config.imageWidth)) || undefined,
    imageHeight: (config.imageHeight && Number(config.imageHeight)) || undefined,
    color: config.color || 'rgba(0, 0, 0, 0.07)',
    fontSize: Number(config.fontSize) || 24,
    zIndex: config.zIndex?.toString() || '1000',
    cSpace: Number(config.cSpace) || 0,
    vSpace: Number(config.vSpace) || 0,
    angle: Number(config.angle) || -25,
    secret: config.secret || false,
    position: config.position || 'repeat',
    onchange: config.onchange || (() => console.log('watermark.onchange')),
    onerror: config.onerror || (() => console.log('watermark.onerror')),
    success: config.success || (() => console.log('watermark.success')),
  }

  console.log('configs=', configs)

  return configs
}
