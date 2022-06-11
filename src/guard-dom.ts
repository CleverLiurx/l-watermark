/**
 * 守护水印DOM
 * @param target 水印dom
 */
class GuardDom {
  target: HTMLElement
  parent: HTMLElement
  cloneTarget: Node
  observer!: MutationObserver
  cb: Function

  constructor(target: HTMLElement, cb: Function) {
    this.target = target
    this.cb = cb
    this.parent = <HTMLElement>this.target.parentElement
    this.cloneTarget = <HTMLElement>target.cloneNode(true)
  }

  start() {
    const body = document.body
    const config = { characterData: true, attributes: true, childList: true, subtree: true }

    this.observer = new MutationObserver(this._callback)
    if (!this.observer) {
      throw new Error('守护DOM失败：浏览器不支持MutationObserver')
    }
    this.observer.observe(body, config)
  }

  _callback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 删除
        mutation.removedNodes.forEach((item) => {
          if (item === this.target) {
            this.cb()
            this._readdDom()
          }
        })
      } else if (this.target === mutation.target) {
        // 修改
        this.cb()
        this._readdDom()
      }
    }
  }

  _readdDom() {
    const newTarget = <HTMLElement>this.cloneTarget.cloneNode(true)
    this.parent.appendChild(newTarget)
    this.target = newTarget
    this.observer.disconnect()
    this.start()
  }
}

export default GuardDom
