# WAHAT IS L-WATERMARK？

`l-watermark` 是一个支持JS、TS、Vue、React的水印SDK，它支持（或未来支持）：

- [x] 自定义水印内容和样式
- [x] 水印守护
- [ ] 水印加解密
- [ ] 水印异常监测、上报
- [ ] 图片添加暗水印

# 安装

## npm 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```cmd
npm i l-watermark
```

## CDN

目前可以通过 `unpkg.com/l-watermark` 获取到最新版本的资源，在页面上引入 `js` 文件即可开始使用。

```html
<script src="https://unpkg.com/l-watermark@latest/dist/l-watermark.umd.js"></script>
```

# DEMO

通过 `CDN` 的方式我们可以很容易地使用 `l-watermark` 添加水印。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>L-WATERMARK</title>
</head>
<body>
  <script src="https://unpkg.com/l-watermark@latest/dist/l-watermark.umd.js"></script>
  <script>
    new WaterMark({
      text: "水印文本",
      containerEl: document.body
    })
  </script>
</body>
</html>
```

# OPTIONS

`l-watermark` 提供了丰富的选项以覆盖多数场景到水印需求，如：

****

| 选项        | 默认值              | 说明                                                         | 值类型         |
| ----------- | ------------------- | ------------------------------------------------------------ | -------------- |
| model       | offline             | 水印模式，offline/online                                     | WaterMarkModel |
| systemId    | 1000                | online模式下会根据systemId和userId生成水印文本(text)，支持加密解密 | string         |
| userId      | 5yJesusZGMVq4px     | 用户id                                                       | string         |
| text        | 默认水印            | 水印文字                                                     | string         |
| containerEl | Document.body       | 添加水印的目标元素                                           | HTMLElement    |
| color       | rgba(0, 0, 0, 0.15) | 水印颜色/透明度                                              | string         |
| fontSize    | 24                  | 水印字体                                                     | number         |
| zIndex      | 10000               | 水印层级                                                     | number         |
| cSpace      | 0                   | 水印文本的横向间距                                           | number         |
| vSpace      | 0                   | 水印文本的纵向间距                                           | number         |
| angle       | -25                 | 水印文本的旋转角度                                           | number         |

