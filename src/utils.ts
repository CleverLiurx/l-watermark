import { Image2Page, Image2Image } from './interface'

export const url2base64: (config: Image2Page | Image2Image) => Promise<string> = async (config) => {
  const img = new Image()
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = config.image

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const { width: imgWidth, height: imgHeight } = img

        const width = imgWidth + config.cSpace
        const height = imgHeight + config.vSpace

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, (width - imgWidth) / 2, (height - imgHeight) / 2)
        const base64 = canvas.toDataURL()
        resolve(base64)
      }
    }

    img.onerror = () => {
      reject('')
    }
  })
}
