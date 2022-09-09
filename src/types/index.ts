// 水印的位置：默认平铺
type Position = 'repeat' | 'center' | 'bottomRight' | 'bottomLeft' | 'topLeft' | 'topRight'

export interface UserWaterMarkConfig {
  target: HTMLElement | HTMLImageElement | string
  text?: string
  image?: string
  imageWidth?: number | string
  imageHeight?: number | string
  color?: string
  fontSize?: string | number
  zIndex?: string | number
  cSpace?: string | number
  vSpace?: string | number
  angle?: string | number
  secret?: boolean
  position?: Position
  onchange?(mr?: MutationRecord): void
  onerror?(err: string): void
  success?(base64?: string): void
}

export interface WaterMarkConfig {
  target: HTMLElement | HTMLImageElement
  text: string
  image: string
  imageWidth?: number
  imageHeight?: number
  color: string
  fontSize: number
  zIndex: string
  cSpace: number
  vSpace: number
  angle: number
  secret: boolean
  position: Position
  onchange(mr?: MutationRecord): void
  onerror(err: string): void
  success(base64?: string): void
}
