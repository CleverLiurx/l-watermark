import {
  PageWaterMarkConfig,
  UserPageWaterMarkConfig,
  ImageWaterMarkConfig,
  UserImageWaterMarkConfig,
} from './interface'
import PageWaterMark from './page'
import ImageWaterMark from './image'

const defaultPageConfig: PageWaterMarkConfig = {
  containerEl: document.body,
  text: '默认水印',
  onchange: () => console.log('水印被改变'),
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 24,
  zIndex: '10000',
  cSpace: 0,
  vSpace: 0,
  angle: -25,
}

const defaultImageConfig: ImageWaterMarkConfig = {
  text: '水印',
  secret: false,
  position: 'repeat',
  color: 'rgba(0, 0, 0, 1)',
  fontSize: 24,
  cSpace: 0,
  vSpace: 0,
  angle: -25,
  success: () => console.log('图片水印添加成功'),
}

class WaterMark {
  constructor() {
    throw new Error('实例化水印错误：请调用WaterMark的静态方法(page/image/video)进行加载水印！')
  }

  static image(config: UserImageWaterMarkConfig) {
    const configs: ImageWaterMarkConfig = { ...defaultImageConfig, ...config }
    return new ImageWaterMark(configs)
  }

  static page(config: UserPageWaterMarkConfig) {
    const configs: PageWaterMarkConfig = { ...defaultPageConfig, ...config }
    return new PageWaterMark(configs)
  }

  static video() {
    throw new Error('暂不支持视频添加水印功能，敬请期待！')
  }
}

export default WaterMark
