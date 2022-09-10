import { WaterMarkConfig } from './types'
import { text2image, image2image } from './core'

const ImageWatermark: (config: WaterMarkConfig, wmType: 'image' | 'text') => Promise<void> = async (
  config,
  wmType
) => {
  if (wmType === 'image') {
    await image2image(config)
  } else {
    text2image(config)
  }
}

export default ImageWatermark
