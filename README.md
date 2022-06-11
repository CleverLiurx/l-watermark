# What is l-watermark？

`l-watermark` 是一个支持JS、TS、Vue、React的水印SDK，它支持（或未来支持）：

- ✅ 自定义WEB网页水印内容和样式
- ✅ 自定义图片水印和样式
- ✅ 水印异常监测、上报
- ✅ 水印守护：防止删除和篡改
- [ ] 图片添加暗水印

# 安装

## npm 安装

推荐使用 `npm`的方式安装，它能更好地和 `webpack` 打包工具配合使用。

```cmd
npm i l-watermark
```

## CDN

目前可以通过 `unpkg.com/l-watermark` 获取到最新版本的资源，在页面上引入 `js` 文件即可开始使用。

```html
<script src="https://unpkg.com/l-watermark@0.1.0/dist/l-watermark.umd.js"></script>
```

# 使用

## WEB网页添加水印

1. 最简单的使用方法

```html
WaterMark.page({})
```

![](https://cdn.bayuechuqi.com/packages%2F1-page.png)

2. 加一些配置吧

```html
<div style="height: 30px; border: 1px solid red;">
  Header
</div>
<div id="main" style="height: 250px; border: 1px solid red">
  MAIN
</div>
<div style="height: 70px; border: 1px solid red">
  FOOTER
</div>
```

```js
WaterMark.page({
  containerEl: document.getElementById('main'),
  text: "翻版必究",
  cSpace: 30,
  color: "rgba(0,0,0,0.1)",
  fontSize: 16,
  onchange: () => {
		console.log("禁止操作水印")
		location.reload()
	}
})
```

![](https://cdn.bayuechuqi.com/packages%2F2-page.png)

## 图片添加水印

1. 给存在的Img标签加水印

```html
<img id="img" width="737" height="482" src="https://cdn.bayuechuqi.com/packages%2Findex.png" alt="">
```

```js
WaterMark.image({
  target: document.getElementById("img"),
  text: '翻版必究',
  cSpace: 80,
  vSpace: 80,
  color: 'rgba(0,0,0,0.2)'
})
```

![](https://cdn.bayuechuqi.com/packages%2F1-image.png)

2. 给存在的Img标签替换src，并添加水印

```html
<img id="img" width="737" height="482" src="https://cdn.bayuechuqi.com/packages%2Findex.png" alt="">
```

```js
WaterMark.image({
  target: document.getElementById("img"),
  text: '@ 自定义水印',
  url: 'https://cdn.bayuechuqi.com/packages%2F3-image.png',
  cSpace: 20,
  vSpace: 20,
  color: 'rgba(255,0,0,1)',
  fontSize: 40,
  position: 'bottomRight'
})
```

![](https://cdn.bayuechuqi.com/packages%2F4-image.png)

3. url/base64加水印转base64

```

WaterMark.image({
  text: '水印文字',
  url: 'https://cdn.bayuechuqi.com/packages%2F3-image.png',
  cSpace: 80,
  vSpace: 80,
  color: 'rgba(0,0,0,0.06)',
  fontSize: 40,
  success: base64 => console.log(base64)
})
控制台输出：data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABcAAAAPGCAYAAADEOjnFAAAgAElEQVR4X...
```

# 配置

`l-watermark` 提供了丰富的选项以覆盖多数场景到水印需求，如：

## 页面page

****

| 选项        | 默认值              | 说明                  | 值类型      |
| ----------- | ------------------- | --------------------- | ----------- |
| text        | 默认水印            | 水印文字              | string      |
| containerEl | document.body       | 添加水印的目标元素    | HTMLElement |
| color       | rgba(0, 0, 0, 0.15) | 水印颜色/透明度       | string      |
| fontSize    | 24                  | 水印字体              | number      |
| zIndex      | 10000               | 水印层级              | string      |
| cSpace      | 0                   | 水印文本的横向间距    | number      |
| vSpace      | 0                   | 水印文本的纵向间距    | number      |
| angle       | -25                 | 水印文本的旋转角度    | number      |
| onchange    | () => {}            | 水印被篡改/删除时回掉 | function    |

## 图片image

****

| 选项     | 默认值              | 说明                                                         | 值类型           |
| -------- | ------------------- | ------------------------------------------------------------ | ---------------- |
| text     | 默认水印            | 水印文字                                                     | string           |
| target   | <img>               | 添加水印的目标元素                                           | HTMLImageElement |
| color    | rgba(0, 0, 0, 0.15) | 水印颜色/透明度                                              | string           |
| fontSize | 24                  | 水印字体                                                     | number           |
| position | repeat              | 水印显示位置：repeat center bottomRight bottomLeft topLeft topRight | string           |
| cSpace   | 0                   | 水印文本的横向间距                                           | number           |
| vSpace   | 0                   | 水印文本的纵向间距                                           | number           |
| angle    | -25                 | 水印文本的旋转角度（position为repeat时才起作用）             | number           |
| success  | (base64) => {}      | 水印添加成功时的回掉，参数base64为添加水印后的图片           | function         |
| secret   | false               | 水印设置为“暗水印”（开发中）                                 | boolean          |
| url      | <empty string>      | 图片url                                                      | String           |

**注意：**

1. target 与 url 至少一个不为空
2. target 与 url 都存在时，会把 url 转换成图片并添加水印，然后替换target
3. target 存在，url 不存在时，会为 target 添加水印
4. target 不存在，url 存在时，仅仅会把 ur l转换为加了水印的 base64