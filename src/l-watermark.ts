import {
  PageWaterMarkConfig,
  UserPageWaterMarkConfig,
  ImageWaterMarkConfig,
  UserImageWaterMarkConfig
} from './ts-type'
import PageWaterMark from './page'
import ImageWaterMark from './image'


const defaultPageConfig: PageWaterMarkConfig = {
  containerEl: document.body,
  text: '默认水印',
  onchange: () => {},
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
  success: () => {}
}

class WaterMark {

  static image(config: UserImageWaterMarkConfig) {
    const configs = WaterMark._initImageConfig(config);
    new ImageWaterMark(configs)
  }

  static page(config: UserPageWaterMarkConfig) {
    const configs = WaterMark._initPageConfig(config)
    new PageWaterMark(configs)
  }

  static video() {
    throw new Error("暂不支持视频添加水印功能，敬请期待！")
  }

  // 初始WEB页面水印配置
  static _initPageConfig(config: UserPageWaterMarkConfig) {
    // TODO
    const configs: PageWaterMarkConfig = { ...defaultPageConfig, ...config }
    return configs
  }

  // 初始图片水印配置
  static _initImageConfig(config: UserImageWaterMarkConfig) {
    // TODO
    const configs: ImageWaterMarkConfig = { ...defaultImageConfig, ...config }
    return configs
  }
}

// @ts-ignore
window.WaterMark = WaterMark

export default WaterMark
