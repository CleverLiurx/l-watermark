English Document Address： https://github.com/CleverLiurx/l-watermark/blob/master/README-en.md

# 一、什么是l-watermark？

`l-watermark` 是一个基于TS的WEB前端水印SDK，它包含：

- 能够覆盖多场景的水印添加方法
  1. 给`网页`添加`文字/图片`水印
  2. 给`图片`添加`文字/图片`水印
  3. 给图片添加`暗水印`
  4. 暗水印图片`解密`
- 守护水印不被篡改和删除
- 提供多种回调函数
  1. onchange: 用户试图篡改或删除水印时的回调，你在此时获取用户id并上报给服务器
  2. onerror: 水印添加失败时的回调，你可以看到水印添加失败的原因
  3. success: 水印添加成功时的回调，你可以获取加了水印的图片base64
- 自定义水印样式
  1. 自定义颜色、字体大小、层级、间距、透明度、旋转角度等
  2. 自定义图片中水印的位置：铺满、中间、左上角、右下角等

# 二、安装

## 2.1 npm

推荐使用 `npm 方式安装最新版

```bash
npm install l-watermark
import WaterMark from "l-watermark"
```

## 2.2 CDN

你可以通过 **unpkg.com/l-watermark** 来获取最新的 SDK，当然你也可以指定 `@x.x.x` 来获取特定版本的 SDK，然后在合适的位置引入即可

```js
<script src="https://unpkg.com/l-watermark@2.0.0/dist/l-watermark.umd.js"></script>
```

# 三、使用示例

## 3.1 给WEB页面添加/移除水印

### 3.1.1 全屏添加文字水印

```js
WaterMark.page({
  containerEl: document.body,
  text: "Internal Data",
  color: "rgba(0, 0, 0, 0.4)",
  fontSize: 24
})
```

![page-demo-1](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/page-demo-1.png)

### 3.1.2 部分区域添加图片水印

```js
WaterMark.page({
  containerEl: document.getElementById("hello_world"),
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 50
})
```

![image-demo-8](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-8.png)

### 3.1.2 移除页面水印

```js
// 创建水印
const demoWaterMark = WaterMark.page({})
// 移除水印
demoWaterMark.remove()
```

## 3.2 给图片添加水印

### 3.2.1 添加文字水印

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  text: 'Angelababy',
  cSpace: 20,
  color: 'rgba(0,0,0,0.6)',
  fontSize: 20,
})
```

![image-demo-1](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-1.png)

### 3.2.2 添加图片水印

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 20,
  imageWidth: 60,
  imageHeight: 40
})
```

![image-demo-2](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-2.png)

### 3.2.3 指定位置添加文字/图片水印

```js
// 右下角添加文字水印
WaterMark.image({
  target: document.getElementById('demo-image'),
  position: "bottomRight",
  text: '@ GitHub - CleverLiurx',
  color: 'rgba(255, 0, 0, 1)',
  fontSize: 20,
  cSpace: 20,
  vSpace: 10,
})
```

![image-demo-3](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-3.png)

```js
// 左上角添加图片水印
WaterMark.image({
  target: document.getElementById('demo-image'),
  position: "topLeft",
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  imageWidth: 100,
  imageHeight: 60,
  cSpace: 20,
  vSpace: 20
})
```

![image-demo-4](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-4.png)

## 3.2.4 获取加了水印的base64图片

由于 `target  ` 不是 `HTMLImageElement` 类型，所以加完水印后页面不会有任何变化，但是你可以通过 `success` 回调获取加完水印的base64图片

```js
WaterMark.image({
  target: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/ab-v1.0.0-demo.png",
  text: 'Angelababy',
  cSpace: 100,
  success: (data) => console.log(data),
})
```

![image-demo-5](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-5.png)

## 3.2.5 暗水印加密/解密

设置暗水印仅需要把 `secret` 设为 `true` 即可，但是 **暗水印此版本仅支持文字模式，暂不支持图片模式**

```js
WaterMark.image({
  target: document.getElementById("demo-image"),
  text: "User Id: 1008611",
  position: 'center',
  secret: true,
})
```

添加完暗水印后，**肉眼看起来新图片与原图没有任何区别**

![image-demo-7](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-7.png)

但是调用暗水印解密工具 `WaterMark.utils.decodeImage(src)` 后发现水印文字显示出来了

```js
const decodeImage = async () => {
  const imgDom = document.getElementById("demo-image")
  const decodeSrc = await WaterMark.utils.decodeImage(imgDom.src)
  imgDom.src = decodeSrc
}
```

![image-demo-6](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-6.png)

# 四、选项

## 4.1 页面加水印 WaterMark.page(PageOp)

****

| Options     | Default               | Explain                                | Type            |
| ----------- | --------------------- | -------------------------------------- | --------------- |
| text        | Demo Text             | 水印文本（与image二选一）              | string          |
| image       |                       | 水印图片（与text二选一）               | string(img.src) |
| containerEl | document.body         | 添加水印的元素                         | HTMLElement     |
| color       | "rgba(0, 0, 0, 0.15)" | 颜色（图片水印时无效）                 | string          |
| fontSize    | 24                    | 字体大小（图片水印时无效）             | number          |
| zIndex      | "10000"               | 水印的层级                             | string        |
| cSpace      | 0                     | 单个水印间的横向间距                   | number          |
| vSpace      | 0                     | 单个水印间的纵向间距                   | number          |
| angle       | -25                   | 水印文本的旋转角度（图片水印时无效）   | number          |
| onchange    |                       | 水印被篡改或删除时的回调               | Function        |
| onerror     |                       | 添加水印发生错误的回调(参数为错误信息) | Function        |
| success     |                       | 水印添加成功后的回调   | Function        |

## 4.2 图片加水印 WaterMark.image(ImageOp)

****

| Options     | Default               | Explain                                                      | Type                                                         |
| ----------- | --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| target      |                       | 要加水印的目标                                               | HTMLImageElement\|string(img.src)                            |
| text        | "Demo Text"           | 水印文本（与image二选一）                                    | string                                                       |
| image       |                       | 水印图片（与text二选一）                                     | string(img.src)                                              |
| imageWidth  |                       | 水印图片的宽度                                               | number                                                       |
| imageHeight |                       | 水印图片的高度                                               | number                                                       |
| secret      | false                 | 开启暗水印                                                   | boolean                                                      |
| color       | "rgba(0, 0, 0, 0.15)" | 颜色（图片水印时无效）                                       | string                                                       |
| fontSize    | 24                    | 字体大小（图片水印时无效）                                   | number                                                       |
| position    | "repeat"              | 水印的位置（默认repeat，铺满；其他选项在指定位置添加一个水印） | string(repeat \|center \|bottomRight \|bottomLeft \|topLeft \|topRight) |
| cSpace      | 0                     | 单个水印间的横向间距                                         | number                                                       |
| vSpace      | 0                     | 单个水印间的纵向间距                                         | number                                                       |
| angle       | -25                   | 水印文本的旋转角度（图片水印时无效）                         | number                                                       |
| success     |                       | 水印添加成功后的钩子（参数为添加水印后的图片的base64）       | Function                                                     |
| onerror     |                       | 添加水印发生错误的钩子(参数为错误信息)                       | Function                                                     |

**注：**`img.src` 代表其可以为**图片路径、url地址、base64**

## 4.3 工具函数 WaterMark.utils

### 4.3.1 暗水印解密 WaterMark.utils.decodeImage

接收一个 `string` 类型参数（img.src），返回 `Promise<string>` ，用法：

```js
const imgBase64 = await WaterMark.utils.decodeImage(url)
```

### 4.3.2 暗水印加密 WaterMark.utils.encodeImage

当然你可以使用 `WaterMark.image({})` 中的 `success` 回调来获取加水印后的图片，但是我们也提供了一个工具函数让你为图片添加暗水印后获取其base64，返回 `Promise<string>`，用法：

```js
const imgBase64 = await WaterMark.utils.decodeImage({ImageOp})
```

## 4.4 API

### 移除页面水印 `remove()`

```js
// 创建水印
const demoWaterMark = WaterMark.page({})
// 移除
demoWaterMark.remove()
```