export interface ErrorType {
  code: number
  message: string
  reason: string
}

// 页面加文字水印
export type Text2Page = {
  text: string // 水印文字
  containerEl: HTMLElement // 添加水印的目标元素
  color: string // 水印字体颜色rgba
  fontSize: number // 水印字体大小
  zIndex: string // 层级
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  angle: number // 水印旋转角度
  onchange?(mr: MutationRecord): void
  onerror?(err: ErrorType): void
  success?(): void
}

// 页面加图片水印
export type Image2Page = {
  image: string // 水印图片
  containerEl: HTMLElement // 添加水印的目标元素
  zIndex: string // 层级
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  onchange?(mr: MutationRecord): void
  onerror?(err: ErrorType): void
  success?(): void
}

// 页面水印 用户配置
export interface UserPageWaterMarkConfig {
  text?: string
  image?: string
  containerEl?: HTMLElement
  color?: string
  fontSize?: number
  zIndex?: string
  cSpace?: number
  vSpace?: number
  angle?: number
  onchange?(mr: MutationRecord): void
  error?(err: ErrorType): void
  success?(): void
}

// 图片加文字水印
export type Text2Image = {
  target: HTMLImageElement // img标签
  text: string // 水印文字
  secret: boolean // 开启暗水印
  position: string // repeat center bottomRight bottomLeft topLeft topRight
  color: string // 水印字体颜色rgba
  fontSize: number // 水印字体大小
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  angle: number // 水印旋转角度
  success?(base64: string): void // 回调用
  onerror?(err: ErrorType): void
}

// 图片加图片水印
export type Image2Image = {
  target: HTMLImageElement // img标签
  image: string // 水印图片url/base64
  imageWidth?: number
  imageHeight?: number
  secret: boolean // 开启暗水印
  position: string // repeat center bottomRight bottomLeft topLeft topRight
  cSpace: number // 水印横向间距
  vSpace: number // 水印纵向间距
  success?(base64: string): void // 回调用
  onerror?(err: ErrorType): void
}

// 图片水印 用户配置
export interface UserImageWaterMarkConfig {
  target: HTMLImageElement | string
  text?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  secret?: boolean
  position?: string
  color?: string
  fontSize?: number
  cSpace?: number
  vSpace?: number
  angle?: number
  success?(base64: string): void
  onerror?(err: ErrorType): void
}
