import { Text2Image, Image2Image, ErrorType } from './interface'

export const url2base64: (src: string, cSpace: number, vSpace: number) => Promise<string> = async (
  src,
  cSpace = 0,
  vSpace = 0
) => {
  const img = new Image()
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = src

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const { width: imgWidth, height: imgHeight } = img

        const width = imgWidth + cSpace
        const height = imgHeight + vSpace

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

export const text2ImageData: (config: Text2Image, width: number, height: number) => ImageData = (
  config,
  width,
  height
) => {
  let data = new ImageData(1, 1)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${config.fontSize}px Microsoft Yahei`
    ctx.fillText(config.text, width / 2, height / 2)
    data = ctx.getImageData(0, 0, width, height)
  }

  return data
}

export const mergeData: (
  originalData: ImageData,
  textData: ImageData,
  color?: string
) => ImageData = (originalData, textData, color = 'R') => {
  const oData = originalData.data
  const tData = textData.data

  let bit
  let offset

  switch (color) {
    case 'G':
      bit = 1
      offset = 2
      break
    case 'B':
      bit = 2
      offset = 1
      break
    default:
      bit = 0
      offset = 3
  }

  for (let i = 0; i < oData.length; i++) {
    if (i % 4 === bit) {
      // 对目标通道：文字为空的地方 原图处理为偶数；文字不为空的地方，原图处理为奇数
      if (tData[i + offset] === 0 && oData[i] % 2 === 1) {
        // 有文字 原图为奇数
        // 文字为空 原图为奇数
        if (oData[i] === 255) {
          oData[i]-- // 变成偶数254
        } else {
          oData[i]++ // 变成偶数
        }
      } else if (tData[i + offset] !== 0 && oData[i] % 2 === 0) {
        // 无文字 原图为偶数
        // 文字不为空 原图为偶数
        oData[i]++ // 变为奇数
      }
    }
  }

  return originalData
}

export const decodeImage: (url: string) => Promise<string> = async (url) => {
  let result = ''
  let width = 0
  let height = 0

  const img = new Image()
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = url

  const originalData = await new Promise<ImageData>((resolve, reject) => {
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
      }
    }

    img.onerror = () => {
      reject(new ImageData(1, 1))
    }
  })

  const { data } = originalData
  for (let i = 0; i < data.length; i++) {
    if (i % 4 == 0) {
      // 红色分量
      if (data[i] % 2 == 0) {
        data[i] = 0
      } else {
        data[i] = 255
      }
    } else if (i % 4 == 3) {
      // alpha通道不做处理
      continue
    } else {
      // 关闭其他分量，不关闭也不影响答案，甚至更美观 o(^▽^)o
      data[i] = 0
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = width
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.putImageData(originalData, 0, 0)
    result = canvas.toDataURL()
  }
  
  return result
}
