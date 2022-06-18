English | [简体中文](https://github.com/CleverLiurx/l-watermark/blob/master/README-zh.md)

# 1. What is l-watermark？

`l-watermark` is a web watermark SDK based on TS, which contains:

- Can cover more than scene watermarking method
  1. Add `text/picture` watermark to `webpage`
  2. Add `text/picture` watermark to `picture`
  3. Add a `'hidden watermark'` to the picture
  4. `Decrypt` hidden watermark images
- Guard the watermark from being tampered with and deleted
- Provides a variety of callback functions
  1. onchange: a callback when a user attempts to tamper with or delete a watermark, at which point you get the user ID and report it to the server
  2. onerror: the callback when the watermark failed to be added, you can see why the watermark failed to be added
  3. success: you can get the watermarked image base64 as a callback when the watermark is successfully added
- Custom watermark style
  1. Customize color, font size, hierarchy, spacing, transparency, rotation angle, etc
  2. Customize the watermark position in the picture: full, middle, upper left corner, lower right corner, etc

# 2. Install

## 2.1 npm

```bash
npm install l-watermark
import WaterMark from "l-watermark"
```

## 2.2 CDN

You can get the latest SDK at **unpkg.com/l-watermark**, or you can specify `@x.x.x'`to get a specific version of the SDK, and then import it at the appropriate location

```js
<script src="https://unpkg.com/l-watermark@2.0.3/dist/l-watermark.umd.js"></script>
```

# 3 Demo

## 3.1 Add watermarks to webpage

### 3.1.1 Full screen text watermark

```js
WaterMark.page({
  containerEl: document.body,
  text: "Internal Data",
  color: "rgba(0, 0, 0, 0.4)",
  fontSize: 24
})
```

![page-demo-1](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/page-demo-1.png)

### 3.1.2 Partial area of the image watermark

```js
WaterMark.page({
  containerEl: document.getElementById("hello_world"),
  image: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/glass15-wm.png",
  cSpace: 20,
  vSpace: 50
})
```

![image-demo-8](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-8.png)

## 3.2 Add watermarks to picture

### 3.2.1 Text watermarking

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

### 3.2.2 Image watermarking

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

### 3.2.3 Adds a watermark at the specified location

```js
// Add text watermark in the lower right corner of the photo
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
// Add the image watermark to the top left corner of the photo
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

## 3.2.4 Get the base64 format of the watermark image

When `target` is not `HTMLImageElement`, the page will not change after watermarking, but you can get the base64 watermarked image through the `success` callback function

```js
WaterMark.image({
  target: "https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/ab-v1.0.0-demo.png",
  text: 'Angelababy',
  cSpace: 100,
  success: (data) => console.log(data),
})
```

![image-demo-5](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-5.png)

## 3.2.5 Encryption/decryption of hidden watermark

To set hidden watermarking, just set `secret` to `true`, but this version only supports text mode, not image mode

```js
WaterMark.image({
  target: document.getElementById("demo-image"),
  text: "User Id: 1008611",
  position: 'center',
  secret: true,
})
```

After adding the hidden watermark,  **the naked eye will look no different from the original image**

![image-demo-7](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-7.png)

However, after the hidden watermark decryption tool is called, the watermark text is displayed

```js
const decodeImage = async () => {
  const imgDom = document.getElementById("demo-image")
  const decodeSrc = await WaterMark.utils.decodeImage(imgDom.src)
  imgDom.src = decodeSrc
}
```

![image-demo-6](https://cdn.jsdelivr.net/gh/CleverLiurx/image_repo/image-demo-6.png)

# 4. Options

## 4.1 WaterMark.page(PageOp)

This is the configuration item when the `WaterMark.page(PageOp)` function is called to add a watermark to the page

****

| Options     | Default               | Explain                                                      | Type                   |
| ----------- | --------------------- | ------------------------------------------------------------ | ---------------------- |
| text        | Demo Text             | watermark text (conflicts with image)                        | string                 |
| image       |                       | watermark image (conflicts with text)                        | string(img.src)        |
| containerEl | document.body         | the element to be watermarked                                | HTMLElement            |
| color       | "rgba(0, 0, 0, 0.15)" | color of text                                                | string                 |
| fontSize    | 24                    | font size of text                                            | number                 |
| zIndex      | "10000"               | css: z-index                                                 | string                 |
| cSpace      | 0                     | the crosswise spacing between individual watermarks          | number                 |
| vSpace      | 0                     | the vertical spacing between individual watermarks           | number                 |
| angle       | -25                   | rotation angle of text                                       | number                 |
| onchange    |                       | a callback function when the watermark is tampered with or deleted | Function               |
| onerror     |                       | a callback function in case of error adding watermark        | Function(ErrorMessage) |
| success     |                       | the callback function after successfully adding watermark    | Function               |

## 4.2 WaterMark.image(ImageOp)

This is the configuration item when the `WaterMark.image(ImageOp)` function is called to add a watermark to the picture

****

| Options     | Default               | Explain                                                      | Type                                                         |
| ----------- | --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| target      |                       | the target to watermark                                      | HTMLImageElement\|string(img.src)                            |
| text        | "Demo Text"           | watermark text (conflicts with image)                        | string                                                       |
| image       |                       | watermark image (conflicts with text)                        | string(img.src)                                              |
| imageWidth  |                       | the width of the image                                       | number                                                       |
| imageHeight |                       | the width of the height                                      | number                                                       |
| secret      | false                 | whether to add a hidden watermark                            | boolean                                                      |
| color       | "rgba(0, 0, 0, 0.15)" | color of text                                                | string                                                       |
| fontSize    | 24                    | font size of text                                            | number                                                       |
| position    | "repeat"              | the location of the watermark (default covered with target, other options is add a watermark at the specified location) | string(repeat \|center \|bottomRight \|bottomLeft \|topLeft \|topRight) |
| cSpace      | 0                     | the crosswise spacing between individual watermarks          | number                                                       |
| vSpace      | 0                     | the vertical spacing between individual watermarks           | number                                                       |
| angle       | -25                   | rotation angle of text                                       | number                                                       |
| success     |                       | he callback function after successfully adding watermark     | Function                                                     |
| onerror     |                       | a callback function in case of error adding watermark        | Function(ErrorMessage)                                       |

**NOTE：**`img.src` means that it can be **a image path、URL address or base64**

## 4.3 WaterMark.utils

### 4.3.1 Decrypt `hidden watermark` images

Receives a `string` argument (img.src) and returns `Promise<string>`

```js
const imgBase64 = await WaterMark.utils.decodeImage(url)
```

### 4.3.2 Add `hidden watermark`

Of course you can use the `success` callback in `WaterMarking. image (ImageOp)` to get the watermarked image, but we also provide a utility function that let's you add `hidden watermark` to the image and get its base64, which returns `Promise<string>`

```js
const imgBase64 = await WaterMark.utils.decodeImage({ImageOp})
```
