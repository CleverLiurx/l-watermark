import { WaterMarkConfig } from './types'
import { text2image, image2image } from './core'

const ImageWatermark: (config: WaterMarkConfig, wmType: 'image' | 'text') => Promise<void> = async (
  config,
  wmType
) => {
  if (wmType === 'image') {
    // 给图片添加图片水印
    await image2image(config)
  } else {
    // 给图片添加文字水印
    text2image(config)
  }
}

export default ImageWatermark
