import { PageConfig, ImageConfig, WaterMarkConfig, UserWaterMarkConfig } from '../types'
import { url2img } from './url2img'

export const fillConfig: (config: UserWaterMarkConfig) => Promise<WaterMarkConfig> = async (
  config
) => {
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

export const initPageConfig: (config: PageConfig.User) => PageConfig.System = (config) => {
  const configs: PageConfig.System = {
    target: config.target || document.body,
    image: config.image || '',
    text: config.text || 'Demo Text',
    color: config.color || 'rgba(0, 0, 0, 0.15)',
    fontSize: Number(config.fontSize) || 24,
    angle: Number(config.angle) || -25,
    imageWidth: (config.imageWidth && Number(config.imageWidth)) || undefined,
    imageHeight: (config.imageHeight && Number(config.imageHeight)) || undefined,
    zIndex: config.zIndex?.toString() || '1000',
    cSpace: Number(config.cSpace) || 0,
    vSpace: Number(config.vSpace) || 0,
    onchange: config.onchange,
    onerror: config.onerror,
    success: config.success,
  }

  return configs
}

export const initImageConfig: (config: ImageConfig.User) => Promise<ImageConfig.System> = async (
  config
) => {
  // 不能同时为空
  if (!config.target && !config.image) {
    throw new Error(`Parameters 'target' and 'image' cannot be empty at the same time`)
  }

  // 将string类型的target转换成HTMLImageElement
  if (typeof config.target === 'string') {
    const dom = await url2img(config.target)
    if (!dom) {
      throw new Error(`An error occurred while loading image (src: ${config.target} )`)
    }
    config.target = dom
  }

  const configs: ImageConfig.System = {
    target: config.target,
    text: config.text || 'Demo Text',
    color: config.color || 'rgba(0, 0, 0, 1)',
    fontSize: Number(config.fontSize) || 24,
    angle: Number(config.angle) || -25,
    image: config.image || '',
    imageWidth: (config.imageWidth && Number(config.imageWidth)) || undefined,
    imageHeight: (config.imageHeight && Number(config.imageHeight)) || undefined,
    secret: config.secret || false,
    position: config.position || 'repeat',
    cSpace: Number(config.cSpace) || 0,
    vSpace: Number(config.vSpace) || 0,
    success: config.success,
    onerror: config.onerror,
  }

  return configs
}
