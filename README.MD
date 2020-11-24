# dapp example

公益 DApp 样例

dapp example

## 安装依赖

```sh
npm insatll
```

## 编译合约

```sh
node src/contracts/compile.js
```

## 编译前端

```sh
npm run build
```

## 环境切换

默认连接真实节点

## 连接假节点 切换到 dev 模式

```js
localStorage.clear()
localStorage.setItem('env', 'dev')
```

## 连接真实节点，切换到  prod 模式

```js
localStorage.clear()
localStorage.setItem('env', 'prod')
```