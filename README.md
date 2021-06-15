# hack-us-client

チーム開発マッチングアプリ「Hack Us」のクライアント

# How to get started

```
yarn install --frozen-lockfile
yarn dev
```

# Development in Docker container

.env.development.local ファイルを作成し以下のように記述

```
NEXT_PUBLIC_BACKEND_URL="http://host.docker.internal:3001"
```
