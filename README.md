English Document Address： https://github.com/CleverLiurx/l-watermark/blob/master/README-en.md

# 一、什么是l-watermark？

`l-watermark` 是一个基于TS的水印SDK，它包含：

- 能够覆盖多场景的水印添加方法
  1. 给`网页`添加`文字/图片`水印
  2. 给`图片`添加`文字/图片`水印
  3. 给图片添加暗水印（将在下一版本上线）
- 守护水印不被篡改和删除
- 提供多种钩子函数
  1. onchange: 用户试图篡改或删除水印时的回调，你在此时获取用户id并上报给服务器
  2. onerror: 水印添加失败时的回调
  3. success: 水印添加成功时的回调
- 自定义水印样式
  1. 自定义颜色、字体大小、层级、间距、透明度等
  2. 自定义图片中水印的位置：铺满、中间、左上角、右下角等

# 二、安装

## 2.1 npm

推荐使用 `npm 方式安装最新版

```bash
npm install l-watermark
```

```js
import WaterMark from "l-watermark"
```

## 2.2 CDN

你可以通过 **unpkg.com/l-watermark** 来获取 Js SDK，然后在合适的位置引入即可

```js
<script src="https://unpkg.com/l-watermark@1.0.1/dist/l-watermark.umd.js"></script>
```

# 三、使用示例

## 3.1 给WEB页面添加水印

### 3.1.1 给页面添加文字水印

```js
WaterMark.page({
  containerEl: document.body,
  text: "Internal Data",
  color: "rgba(0, 0, 0, 0.4)",
  fontSize: 24
})
```

![page-demo-1](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/page-demo-1.png)

### 3.1.2 给页面添加图片水印

```js
WaterMark.page({
  containerEl: document.body,
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 50
})
```

![page-demo-2](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/page-demo-2.png)

## 3.2 给图片添加水印

### 3.2.1 给图片添加铺满的文字水印

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  text: 'Angelababy',
  cSpace: 100,
  vSpace: 30,
  color: 'rgba(0,0,0,0.6)',
  fontSize: 70,
})
```

![page-demo-1](/Users/didi/Desktop/page-demo-1.png)

### 3.2.2 给图片添加铺满的图片水印

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 20
})
```

![image-demo-2](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-2.png)

### 3.2.3 给图片添加指定位置的文字/图片水印

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  position: "bottomRight",
  text: '@ GitHub - CleverLiurx',
  color: 'rgba(255, 0, 0, 1)',
  fontSize: 80,
  cSpace: 20,
  vSpace: 20,
})
```

![image-demo-3](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-3.png)

```js
WaterMark.image({
  target: document.getElementById('demo-image'),
  position: "topLeft",
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 20,
})
```

![image-demo-4](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-4.png)

## 3.2.4 获取加了水印的图片的base64

没有配置 `targe`，页面不会有任何变化，如果同时配置了 `target` 和 `url`，**会把 url 添加水印的图片后替换 target**

```js
WaterMark.image({
  url: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/ab-v1.0.0-demo.png", // 网络地址或base64
  text: 'Angelababy',
  cSpace: 100,
  success: (data) => console.log(data),
})
```

![image-demo-5](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-5.png)

# 配置

## 页面加水印 WaterMark.page

****

| Options     | Default             | Explain                                | Type                  |
| ----------- | ------------------- | -------------------------------------- | --------------------- |
| text        | 默认水印            | 水印文本（与image二选一）              | string                |
| image       |                     | 水印图片（与text二选一）               | string（url\|base64） |
| containerEl | document.body       | 添加水印的元素                         | HTMLElement           |
| color       | rgba(0, 0, 0, 0.15) | 颜色（图片水印时无效）                 | string                |
| fontSize    | 24                  | 字体大小（图片水印时无效）             | number                |
| zIndex      | 10000               | 水印的层级                             | string                |
| cSpace      | 0                   | 单个水印间的横向间距                   | number                |
| vSpace      | 0                   | 单个水印间的纵向间距                   | number                |
| angle       | -25                 | 水印文本的旋转角度（图片水印时无效）   | number                |
| onchange    |                     | 水印被篡改或删除时的钩子               | Function              |
| onerror     |                     | 添加水印发生错误的钩子(参数为错误信息) | Function              |
| success     |                     | 水印添加成功后的钩子                   | Function              |

## 图片加水印 WaterMark.image

****

| Options  | Default             | Explain                                                      | Type                                                         |
| -------- | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| text     | 默认水印            | 水印文本（与image二选一）                                      | string                                                       |
| image |                     | 水印图片（与text二选一） | string（url\|base64） |
| target   |                     | 要加水印的目标                                          | HTMLImageElement                                             |
| url      |                     | 图片的地址或base64（详细信息见文末）                                | string(url\|base64)                                          |
| color    | rgba(0, 0, 0, 0.15) | 颜色（图片水印时无效）                                       | string                                                       |
| fontSize | 24                  | 字体大小（图片水印时无效）                                   | number                                                       |
| position | repeat              | 水印的位置（默认repeat，铺满；其他选项在指定位置添加一个水印） | string(repeat \|center \|bottomRight \|bottomLeft \|topLeft \|topRight) |
| cSpace   | 0                   | 单个水印间的横向间距                                         | number                                                       |
| vSpace   | 0                   | 单个水印间的纵向间距                                         | number                                                       |
| angle    | -25                 | 水印文本的旋转角度（图片水印时无效）                         | number                                                       |
| success  |                     | 水印添加成功后的钩子（参数为添加水印后的图片的base64）       | Function                                                     |
| onerror     |                     | 添加水印发生错误的钩子(参数为错误信息) | Function              |

**注意：**

- 如果同时配置了 `target` 和 `url`，会把 url 转换成图片，然后添加水印，最后替换 target

- 如果没有 `target`，只有 `url`，会把 url 转换成图片，然后添加水印，页面不会有任何变化