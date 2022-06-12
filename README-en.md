# What is l-watermark？

`l-watermark` is a watermark SDK that supports TS, including:

- Add a watermark to `web page` or `image`
- Customize the content and style of watermark
- Monitor watermarks to prevent tampering and deletion
- Provide hooks: You can send the userId to the server when watermarking is abnormal
- Add a `hidden watermark` to the image

# DEMO

See: https://github.com/CleverLiurx/l-watermark/blob/master/demo/index.html

# Install

## npm

`npm` installation is recommended

```shell
npm install l-watermark
```

## CDN

You can obtain the latest version of the resource through "unpkg.com/l-watermark", and introduce the `js` file on the page to start using it.

```html
<script src="https://unpkg.com/l-watermark@0.1.2/dist/l-watermark.umd.js"></script>
```

# Usage

## Add watermarks to web pages

1. Simplest: add watermarks to all pages

```js
WaterMark.page({})
```

![default-page-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/default-page-wm.png)

2. Make the watermark more beautiful

```js
WaterMark.page({
  text: "Confidential Paper",
  color: "rgba(0,0,0,0.08)",
  cSpace: 100
})
```

![diy-page-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/diy-page-wm.png)

3. Add different watermarks for different areas

```js
WaterMark.page({
  containerEl: document.getElementById("top-container"),
  text: "Secret Content"
})
WaterMark.page({
  containerEl: document.getElementById("bottom-container"),
  text: "GitHub",
  angle: 0,
  cSpace: 120,
  vSpace: 10,
  fontSize: 30
})
```

![two-container-diff-page-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/two-container-diff-page-wm.png)

## Add a watermark to the image

1. Add a watermark to the `img` element

```js
WaterMark.image({
  target: document.getElementById("demo-image"),
  cSpace: 50,
  vSpace: 30,
  text: "Banned Gaiden",
  color: "rgba(0,0,0,0.6)",
  fontSize: 30,
})
```

![default-image-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/default-image-wm.png)

2. Adds a watermark at the specified location

```js
WaterMark.image({
  position: "bottomRight",
  target: document.getElementById("demo-image"),
  cSpace: 20,
  vSpace: 20,
  text: "@ GitHub - CleverLiurx",
  color: "rgba(87, 8, 235, 1)",
  fontSize: 40,
})
```

![position-image-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/position-image-wm.png)

3. Ges `base64` with a watermarked image

```js
WaterMark.image({
  target: document.getElementById("demo-image"),
  /**
   * If you don't have an <img> label
   * You can use the option "url" instead of "target"
   * The url can be a web image address or a base64
   * Then use the SUCCESS callback function to accept base64 of the watermarked image
   * For example：
   * url: "http://example.com/image/xxx.pnng",
   * url: "data:image/png;base64,iVBORw0KG..."
   * Note: When both URL and target are configured, the watermarked image of the "url" will be replaced by "target.src"
   */
  text: "To base64",
  cSpace: 100,
  success: data => console.log(data)
})
```

![base64-image-wm](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/base64-image-wm.png)

4. Add "Hidden Watermark" to the image

**This feature will be updated in the next version**

![preload](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/0232071584c8c353536eb607235b1e61.jpeg)

# Config

## WaterMark.page

****

| Options     | Default             | Explain                                                      | Type        |
| ----------- | ------------------- | ------------------------------------------------------------ | ----------- |
| text        | 默认水印            | watermark text                                               | string      |
| containerEl | document.body       | the container of watermark                                   | HTMLElement |
| color       | rgba(0, 0, 0, 0.15) | css: color                                                   | string      |
| fontSize    | 24                  | css: font-size                                               | number      |
| zIndex      | 10000               | css: z-index                                                 | string      |
| cSpace      | 0                   | crosswise spacing                                            | number      |
| vSpace      | 0                   | vertical spacing                                             | number      |
| angle       | -25                 | rotation angle                                               | number      |
| onchange    | () => {}            | callback function when the watermark is tampered with or deleted | Function    |

## WaterMark.image

****

| Options  | Default             | Explain                                                      | Type             |
| -------- | ------------------- | ------------------------------------------------------------ | ---------------- |
| text     | 水印                | watermark text                                               | string           |
| target   |                     | the target element of the watermark                          | HTMLImageElement |
| color    | rgba(0, 0, 0, 0.15) | css: color                                                   | string           |
| fontSize | 24                  | css: font-size                                               | number           |
| position | repeat              | position of watermark: repeat \| center \| bottomRight \| bottomLeft \| topLeft \| topRight | string           |
| cSpace   | 0                   | crosswise spacing                                            | number           |
| vSpace   | 0                   | vertical spacing                                             | number           |
| angle    | -25                 | rotation angle（It only works when `position: repeat`. In other cases, the default value of angle is 0） | number           |
| success  | (base64) => {}      | The callback function when watermark is successfully added, the parameter is base64 for the image | Function         |
| url      |                     | a web image address or a base64                              | string           |

**About `target` and `url`：**

1. At least one target and URL cannot be empty
2. When both `url` and `target` are configured, the watermarked image of the `url` will be replaced by `target.src`
3. If the `target` exists, the `url` does not exist, a watermark is added to the target
4. If the  `target` does not exist, the `url` exists, the page does not change, but you can use the `SUCCESS callback function` to accept base64 of the watermarked image