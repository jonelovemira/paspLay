const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults();
server.use(middleware)

// 支持加载多个db json文件
// const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach(function (file) {
  // console.log('forEach:', require(path.resolve(mockDir, file)))	
  Object.assign(base, require(path.resolve(mockDir, file)));
  // _.extend(base, require(path.resolve(mockDir, file)))
})


// 这个必须在 server.use(router)之前
server.use(jsonServer.rewriter({
  '/services/*': '/$1',
  '/gw/*': '/$1'
}));
const router = jsonServer.router(base)
server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  console.log('json-server proxy local data: ', res.locals.data);
  let local = res.locals.data; 		
  let data = Object.assign({
  	 code: 'core.ok',
     reason: 'OK'
  }, Array.isArray(local) ? {data: local} : local.data ? local : {data: local});
  
  res.jsonp(data);
}

server.listen(9090, () => {
  console.log('JSON Server is running, port 9090')
})
