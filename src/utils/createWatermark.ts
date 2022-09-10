import { WaterMarkConfig } from '../types'

/**
 * @description 根据水印的配置生成水印元素，并添加到target中
 * @param config 水印配置
 * @returns 生成的水印元素
 */
export const createWatermark: (config: WaterMarkConfig) => HTMLDivElement = (config) => {
  const watermark = document.createElement('div')
  watermark.className = 'l-watermark'

  const { target, image, imageWidth, imageHeight, zIndex } = config

  const wmStyle: { [key: string]: string } = {
    'background-image': `url(${image})`,
    position: target === document.body ? 'fixed' : 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    'pointer-events': 'none',
    'background-repeat': 'repeat',
    'background-size': `${imageWidth}px ${imageHeight}px`,
    'z-index': zIndex,
    display: 'block',
    visibility: 'visible',
    width: '100%',
    height: '100%',
    opacity: '1',
    transform: 'none',
  }

  let style = ''
  for (let key in wmStyle) {
    style += `${key}: ${wmStyle[key]} !important; `
  }

  watermark.setAttribute('style', style)
  ;(config.target as HTMLElement).style.position = 'relative'
  ;(config.target as HTMLElement).appendChild(watermark)

  return watermark
}
