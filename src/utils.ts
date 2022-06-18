import { ErrorType } from './interface'

// 错误消息
export class ErrorMsg {
  static NoSupportMutation() {
    return {
      code: 1001,
      message: '开启水印守护失败',
      reason: '浏览器不支持MutationObserver',
    } as ErrorType
  }

  static NoSupportCanvas() {
    return {
      code: 1002,
      message: '初始化水印失败',
      reason: '浏览器不支持canvas',
    } as ErrorType
  }

  static ImageNotFound(reason?: string) {
    return {
      code: 2001,
      message: '图片加载失败',
      reason: reason || '水印图片的src错误',
    } as ErrorType
  }

  static ParamsError(reason?: string) {
    return {
      code: 3001,
      message: '参数错误',
      reason: reason || '参数类型错误',
    } as ErrorType
  }

  static UnknownError(reason?: string) {
    return {
      code: 4001,
      message: '未知错误',
      reason: reason || '未知原因',
    } as ErrorType
  }
}

// 图片url解密
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
      } else {
        throw ErrorMsg.NoSupportCanvas()
      }
    }

    img.onerror = () => {
      reject(ErrorMsg.ImageNotFound())
    }
  })

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
    throw ErrorMsg.NoSupportCanvas()
  }

  return result
}

// 获取文字长宽
export const getTextSize = (text: string, fontSize: number) => {
  const result: { width: number; height: number } = { width: 0, height: 0 }

  const span = document.createElement('span')
  result.width = span.offsetWidth
  result.height = span.offsetWidth

  span.style.visibility = 'hidden'
  span.style.fontSize = fontSize + 'px'
  document.body.appendChild(span)

  if (span.textContent) {
    span.textContent = text
  } else {
    span.innerText = text
  }

  result.width = span.offsetWidth - result.width
  result.height = span.offsetHeight - result.height

  span.parentNode?.removeChild(span)
  return result
}

// url转img dom
export const url2img: (
  src: string,
  width?: number,
  height?: number
) => Promise<HTMLImageElement> = (src, width, height) => {
  const img = new Image(width, height)
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = src
  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(ErrorMsg.ImageNotFound())
    }
  })
}
