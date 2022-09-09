import { WaterMarkConfig } from '../types'
import { GuardDom } from '../utils'

export const createCanvas: (image: HTMLImageElement) => [HTMLCanvasElement, CanvasRenderingContext2D] = (image) => {
  const { width, height } = image

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  ctx.drawImage(image, 0, 0, width, height)

  return [canvas, ctx]
}
