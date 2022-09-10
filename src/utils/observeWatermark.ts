import { WaterMarkConfig } from '../types'

/**
 * @description 监控水印的dom元素，防止被改变
 * @param watermark 水印dom元素
 * @param config 水印配置
 * @returns 监视器observe，配有remove方法，可以删除水印
 */
export const observeWatermark = (watermark: HTMLDivElement, config: WaterMarkConfig) => {
  const { onchange, success } = config
  const observe = new Guard(watermark, onchange)
  success()
  return observe
}

export class Guard {
  watermarkParent: HTMLElement
  watermarkClone: HTMLElement
  observer!: MutationObserver

  constructor(public watermark: HTMLElement, public onchange: Function) {
    // 获取watermark的父元素：监视的对象
    this.watermarkParent = this.watermark.parentElement as HTMLElement
    // 克隆一个watermark：当watermark被删除时添加watermarkClone
    this.watermarkClone = watermark.cloneNode(true) as HTMLElement
  }

  start() {
    const config = { characterData: true, attributes: true, childList: true, subtree: true }

    this.observer = new MutationObserver(this._callback)
    if (!this.observer) {
      throw new Error(`Not exist: new MutationObserver()`)
    }
    this.observer.observe(this.watermarkParent, config)
  }

  stop() {
    this.observer.disconnect()
    this.watermark.remove()
  }

  _callback = (mutationsList: MutationRecord[]) => {
    let needRestart = false
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          if (mutation.removedNodes[i] === this.watermark) {
            needRestart = true
            break
          }
        }
      } else if (mutation.target === this.watermark) {
        needRestart = true
      }
      if (needRestart) {
        this.onchange(mutation)
        this._readdWatermark()
        this.start()
        break
      }
    }
  }

  // 重新添加水印dom
  _readdWatermark() {
    const newWatermark = this.watermarkClone.cloneNode(true) as HTMLElement
    this.watermarkParent.appendChild(newWatermark)
    this.watermark = newWatermark
    this.observer.disconnect()
    this.start()
  }
}
