// url转img dom
export const url2img: (
  src: string,
  width?: number,
  height?: number
) => Promise<HTMLImageElement | null> = (src, width, height) => {
  const img = new Image(width, height)
  img.setAttribute('crossorigin', 'crossorigin')
  img.src = src
  return new Promise<HTMLImageElement | null>((resolve, reject) => {
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      resolve(null)
    }
  })
}
