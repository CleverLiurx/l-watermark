import { WaterMarkConfig } from '../types'
import { getTextSize, GuardDom } from '../utils'

const _observeWaterMark = () => {
  const { onchange, success } = this.config
  this.guardDom = new GuardDom(this.watermakr, onchange)
  this.guardDom?.start()
  success && success()
}

const _addWatermark2Container = (imgUrl: string, width?: number, height?: number) => {
  this.watermakr.className = 'l-watermark'

  const wmStyle: { [key: string]: string } = {
    'background-image': `url(${imgUrl})`,
    position: this.config.target === document.body ? 'fixed' : 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    'pointer-events': 'none',
    'background-repeat': 'repeat',
    'background-size': `${width}px ${height}px`,
    'z-index': this.config.zIndex,
    display: 'block',
    visibility: 'visible',
    width: '100%',
    height: '100%',
    opacity: '1',
    transform: 'none',
  }

  let style = ''
  for (let key in wmStyle) {
    style += `${key}: ${wmStyle[key]} !important; `
  }

  this.watermakr.setAttribute('style', style)
  ;(this.config.target as HTMLElement).style.position = 'relative'
  ;(this.config.target as HTMLElement).appendChild(this.watermakr)
}

const text2page = (config: WaterMarkConfig) => {
  const canvas = document.createElement('canvas')
  const { width, height } = getTextSize(config.text, config.fontSize)
  const ctx = canvas.getContext('2d')

  const dpr = window.devicePixelRatio || 1
  canvas.width = (width + config.cSpace) * dpr
  canvas.height = (width + config.vSpace) * dpr

  if (ctx) {
    ctx.font = `${config.fontSize}px Microsoft YaHei`
    ctx.fillStyle = config.color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((Math.PI / 180) * config.angle)
    ctx.scale(dpr, dpr)
    ctx.fillText(config.text, 0, 0)
  } else {
    throw new Error(`Not exist: document.createElement('canvas').getContext('2d')`)
  }

  const base64 = canvas.toDataURL()
  this._addWatermark2Container(base64, canvas.width / dpr, canvas.height / dpr)
  this._observeWaterMark()
}

export default text2page