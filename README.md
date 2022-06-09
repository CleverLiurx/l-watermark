# 简介

安全的水印服务，提供了WEB页面水印，图片暗水印（开发中），支持水印加密解密、水印防删除等

# 下载

**npm**

```
npm install -S l-watermark
```

**script**

```
<script src="index.js" type="text/javascript"></script>
```

# 使用

```
new WaterMark({
  test: '水印文字',
  cSpace: 100
})
```

# OPTIONS

```
model: WaterMarkModel; // 模式
systemId: string; // 系统id
userId: string; // 用户id
text: string; // 水印文字
containerEl: HTMLElement; // 添加水印的目标元素
color: string; // 水印字体颜色rgba
fontSize: number; // 水印字体大小
zIndex: number; // 层级
cSpace: number; // 水印横向间距
vSpace: number; // 水印纵向间距
angle: number; // 水印旋转角度
```