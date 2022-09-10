/**
 * @description 对加了暗水印的图片进行解密
 * @param src 图片的src：网络路径、本地路径、base64等合法的src
 * @returns 解密后的图片的base64
 */

export const decodeImage: (src: string) => Promise<string> = async (src) => {
  let result = ''
  let width = 0
  let height = 0

  const img = new Image()
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = src

  const originalData = await new Promise<ImageData | null>((resolve, reject) => {
    img.onload = () => {
      width = img.width
      height = img.height
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
      }

      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(0, 0, width, height)
      resolve(data)
    }

    img.onerror = () => {
      resolve(null)
    }
  })

  if (!originalData) {
    throw new Error(`An error occurred while loading image (src: ${src} )`)
  }

  const { data } = originalData
  for (let i = 0; i < data.length; i++) {
    if (i % 4 === 0) {
      // 红色分量
      if (data[i] % 2 === 0) {
        data[i] = 0
      } else {
        data[i] = 255
      }
    } else if (i % 4 === 3) {
      // alpha通道不做处理
      continue
    } else {
      // 关闭其他分量
      data[i] = 0
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  ctx.putImageData(originalData, 0, 0)
  result = canvas.toDataURL()

  return result
}
