import { WaterMarkConfig, UserWaterMarkConfig } from '../types'
import { createImage } from './createImage'

/**
 * @description 根据用户输入的水印配置，生成完整的水印配置
 *              0. 将string类型的target转换为图片dom元素
 *              1. 类型转换
 *              2. 填充默认配置
 * @param config 用户输入的配置
 * @returns 水印配置
 */

export const initConfig: (config: UserWaterMarkConfig) => Promise<WaterMarkConfig> = async (
  config
) => {
  if (typeof config.target === 'string') {
    const dom = await createImage(config.target)
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

  return configs
}
