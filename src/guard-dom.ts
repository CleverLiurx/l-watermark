import { ErrorMsg } from './utils'

/**
 * 守护水印DOM
 * @param target 水印dom
 */
class GuardDom {
  target: HTMLElement
  parent: HTMLElement
  cloneTarget: Node
  observer!: MutationObserver
  onchange: Function | undefined
  success: Function | undefined
  onerror: Function | undefined

  constructor(
    target: HTMLElement,
    onchange: Function | undefined,
    success: Function | undefined,
    onerror: Function | undefined
  ) {
    this.target = target
    this.onchange = onchange
    this.success = success
    this.onerror = onerror
    this.parent = this.target.parentElement as HTMLElement
    this.cloneTarget = target.cloneNode(true) as HTMLElement
  }

  start() {
    const body = document.body
    const config = { characterData: true, attributes: true, childList: true, subtree: true }

    this.observer = new MutationObserver(this._callback)
    if (!this.observer) {
      this.onerror && this.onerror(ErrorMsg.NoSupportMutation())
    }
    this.observer.observe(body, config)
    this.success && this.success()
  }

  stop() {
    this.observer.disconnect()
  }

  _callback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 删除
        mutation.removedNodes.forEach((item) => {
          if (item === this.target) {
            this.onchange && this.onchange()
            this._readdDom()
          }
        })
      } else if (this.target === mutation.target) {
        // 修改
        this.onchange && this.onchange(mutation)
        this._readdDom()
      }
    }
  }

  _readdDom() {
    const newTarget = this.cloneTarget.cloneNode(true) as HTMLElement
    this.parent.appendChild(newTarget)
    this.target = newTarget
    this.observer.disconnect()
    this.start()
  }
}

export default GuardDom
