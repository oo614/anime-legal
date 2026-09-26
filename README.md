# anime-legal

开源的合法动漫/视频播放应用模板，使用 React Native + Expo 和 Express。仅支持官方、授权、公共领域、CC 内容或用户本地文件；不托管或分发未经授权的版权内容。

## 运行

后端：

```bash
cd backend
npm install
npm start
```

前端：

```bash
cd frontend
npm install
npx expo start
```

真机调试时，请将 `frontend/App.js` 中的 `API_URL` 改为电脑局域网地址。

## 目录

- `frontend/`：Expo React Native 客户端
- `backend/`：Express 示例 API
- `LICENSE`：MIT 许可证
- `CONTRIBUTING.md`：贡献和合法来源要求

## 合规要求

所有视频来源都必须是官方、授权、公共领域、Creative Commons 或用户自有文件。禁止添加盗版链接、未授权下载、DRM 绕过或隐藏来源的代码。新增来源时，请在 PR 中附上原始链接和授权依据。
