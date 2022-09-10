/**
 * @description 根据图片的src width height生成图片dom元素
 * @param src 图片的src
 * @param width 图片的宽度
 * @param height 图片的高度
 * @returns 图片dom元素
 */
export const createImage: (
  src: string,
  width?: number,
  height?: number
) => Promise<HTMLImageElement> = async (src, width, height) => {
  const img = new Image(width, height)
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = src
  const imageDom = await new Promise<HTMLImageElement | null>((resolve) => {
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      resolve(null)
    }
  })

  if (!imageDom) {
    throw new Error(`An error occurred while loading image (src: ${src} )`)
  }

  return imageDom
}
