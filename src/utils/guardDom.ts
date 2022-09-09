/**
 * 守护水印DOM
 * @param target 水印dom
 * @param onchange 水印改变时的钩子函数
 */
export class GuardDom {
  targetParent: HTMLElement
  targetClone: HTMLElement
  observer!: MutationObserver

  constructor(public target: HTMLElement, public onchange: Function | undefined) {
    // 获取target的父元素：监视的对象
    this.targetParent = this.target.parentElement as HTMLElement
    // 克隆一个target：当target被删除时添加targetClone
    this.targetClone = target.cloneNode(true) as HTMLElement
  }

  start() {
    const config = { characterData: true, attributes: true, childList: true, subtree: true }

    this.observer = new MutationObserver(this._callback)
    if (!this.observer) {
      throw new Error(`Not exist: new MutationObserver()`)
    }
    this.observer.observe(this.targetParent, config)
  }

  stop() {
    this.observer.disconnect()
    this.target.remove()
  }

  _callback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach((item) => {
          if (item === this.target) {
            // 删除：onchang回调/重新添加一个水印dom
            this.onchange && this.onchange(mutation)
            this._readdDom()
          }
        })
      } else if (this.target === mutation.target) {
        // 修改：onchang回调/重新添加一个水印dom
        this.onchange && this.onchange(mutation)
        this._readdDom()
      }
    }
  }

  // 重新添加水印dom
  _readdDom() {
    const newTarget = this.targetClone.cloneNode(true) as HTMLElement
    this.targetParent.appendChild(newTarget)
    this.target = newTarget
    this.observer.disconnect()
    this.start()
  }
}