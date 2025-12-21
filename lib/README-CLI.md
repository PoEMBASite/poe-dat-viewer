# CLI

本项目修改poe-dat-viewer的CLI代码以满足实际需求，修改内容包括：

- 默认缓存schema文件，可以删除解包目录下的`schema.min.js`以清理缓存
- 默认导出tables的所有字段，你不需要在配置文件中声明
- 支持腾讯客户端

## 编译和安装

*参考`..\.github\workflows\lib.yml`*

这里我使用`pnpm`作为包管理器，首次执行时安装依赖：

```powershell
pnpm install
```

后续编译和安装（注意：安装时需要使用`npm`，`pnpm`似乎不支持该命令）：
```powershell
pnpm tsc
npm install -g
```

## 使用

### config.json

在存储解包文件的目录创建config.json（参考[ExportConfig](https://github.com/pathoftop/poe-dat-viewer/blob/master/lib/src/cli/ExportConfig.ts)）：

```json
{
  "steam": "D:\\WeGameApps\\rail_apps\\流放之路(511)",
  "files": [
    "Metadata/StatDescriptions/stat_descriptions.txt",
    "Metadata/StatDescriptions/passive_skill_stat_descriptions.txt",
    "Metadata/StatDescriptions/tincture_stat_descriptions.txt"
  ],
  "translations": [
    "Simplified Chinese"
  ],
  "tables": [
    {
      "name": "BaseItemTypes"
    },
    {
      "name": "ClientStrings"
    }
  ]
}
```

### 执行

注意：下载`schema.min.json`和CDN文件需要全局的国际互联网能力：

```
npm exec pathofexile-dat
```

## 其它

### ImageMagick依赖

在解包过程中，`.dds`文件会被转换为`.png`文件，这依赖于`ImageMagick`命令行程序，如果你需要解包`.dds`文件，就需要配置该依赖，否则不用。

手动下载[ImageMagick](https://imagemagick.org/script/download.php)，在执行解包命令前将其所在路径添加到PATH，例如：

```
$env:PATH += ";D:\AppsInDisk\ImageMagick-7.1.1-47-portable-Q16-HDRI-x64"
```