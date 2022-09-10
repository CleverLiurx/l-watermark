/**
 * @description 根据文字和字号，计算该文字在网页上的宽度和高度
 * @param text 文字内容
 * @param fontSize 字号
 * @returns 文字的宽高
 */

export const getTextSize: (text: string, fontSize: number) => { width: number; height: number } = (
  text,
  fontSize
) => {
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
