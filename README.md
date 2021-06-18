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

# Graphql の型生成

1. interfaces/\*.ts に Apollo の gql を用いて query や mutation を記述

2. `yarn generate`を実行

3. types/graphql/index.d.ts に型ファイルが生成される
