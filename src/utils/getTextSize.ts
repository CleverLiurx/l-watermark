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
