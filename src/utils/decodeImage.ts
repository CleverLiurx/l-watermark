// 图片url解密
export const decodeImage: (url: string) => Promise<string> = async (url) => {
  let result = ''
  let width = 0
  let height = 0

  const img = new Image()
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = url

  const originalData = await new Promise<ImageData | null>((resolve, reject) => {
    img.onload = () => {
      width = img.width
      height = img.height
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const data = ctx.getImageData(0, 0, width, height)
        resolve(data)
      } else {
        throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
      }
    }

    img.onerror = () => {
      resolve(null)
    }
  })

  if (!originalData) {
    throw new Error(`An error occurred while loading image (src: ${url} )`)
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
  if (ctx) {
    ctx.putImageData(originalData, 0, 0)
    result = canvas.toDataURL()
  } else {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  return result
}
