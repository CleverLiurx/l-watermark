export interface PageWaterMarkConfig {
  text: string // 水印文字
  containerEl: HTMLElement // 添加水印的目标元素
  onchange: Function
  color: string // 水印字体颜色rgba
  fontSize: number // 水印字体大小
  zIndex: string // 层级
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  angle: number // 水印旋转角度
}

export interface UserPageWaterMarkConfig {
  text: string
  containerEl?: HTMLElement
  onchange?: Function
  color?: string
  fontSize?: number
  zIndex?: string
  cSpace?: number
  vSpace?: number
  angle?: number
}

export interface ImageWaterMarkConfig {
  target?: HTMLImageElement // img标签
  url?: string // 图片url/base64
  text: string // 水印文字
  secret: boolean // 开启暗水印
  position: string // repeat center bottomRight bottomLeft topLeft topRight
  color: string // 水印字体颜色rgba
  fontSize: number // 水印字体大小
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  angle: number // 水印旋转角度
  success: Function // 回调用
}

export interface UserImageWaterMarkConfig {
  target?: HTMLImageElement
  url?: string
  text?: string
  secret?: boolean
  position?: string
  color?: string
  fontSize?: number
  cSpace?: number
  vSpace?: number
  angle?: number
  success?: Function
}
