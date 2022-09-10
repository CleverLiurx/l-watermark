// 水印的位置（默认平铺）：平铺 居中 右下 左下 左上 上右
type Position = 'repeat' | 'center' | 'bottomRight' | 'bottomLeft' | 'topLeft' | 'topRight'

// 用户输入的配置
export interface UserWaterMarkConfig {
  // 目标元素（即给谁加水印）
  // HTMLElement：给页面添加水印，可以是document.body或其他可以设置background属性的dom元素
  // HTMLImageElement：给图片添加属性，为img标签
  // string：给图片添加属性，为图片的src，可以是网络路径、本地路径或base64等
  target: HTMLElement | HTMLImageElement | string
  // 水印的内容（文字）
  text?: string
  // 水印的内容（图片：图片的合法src）
  image?: string
  // image属性的宽度
  imageWidth?: number | string
  // image属性的高度
  imageHeight?: number | string
  // text属性的颜色
  color?: string
  // text属性的大小
  fontSize?: string | number
  // 水印的层级er
  zIndex?: string | number
  // 单个水印间的横向距离
  cSpace?: string | number
  // 单个水印间的纵向距离
  vSpace?: string | number
  // text属性的旋转角度r
  angle?: string | number
  // 是否添加暗水印（只有给图片添加文字水印时生效）
  secret?: boolean
  // 水印的位置（仅当给图片添加水印时生效）
  position?: Position
  // 水印被改变时的回调函数（仅当给页面添加水印时生效）
  onchange?(mr?: MutationRecord): void
    // 添加水印过程发生错误时的回调
  onerror?(err: string): void
  // 水印添加成功时的回调
  success?(base64?: string): void
}

// 根据用户配置生成的完整的水印配置
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
