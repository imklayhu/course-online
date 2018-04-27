# async/await的使用和注意事项

## await 
`awiat`  操作符用于等待一个Promise队形，它只能在一部函数async function内部使用。

`await`的使用语法：
```
[return_value] = await expression;
```
其中`expression`是一个`Promise`对象或者任何要等待的值；
而awiat expression的执行结果有以下集中情况：
1. 若expression是一个Promise对象，并且其以值x被fulfilled，则返回x；
2. 若expression是一个Promise对象，并且以异常e被rejected，则抛出异常e；
3. 若expression不是Promise对象，则会讲expression处理成一个以expression值被fulfilled的promise对象，然后返回这个Promise对象的最终值（即expression值）。这种用法没太大的意义，因此实际使用时还是尽量在await后跟一个promise对象。

另外需要注意的是，await在等待Promise对象时对导致async function暂停执行，一直到Promise对象决议之后才会async function继续执行
```
async function foo() {
  var a = await new Promise((resolve) => {
      setTimeout(() => {
          resolve(1);
      }, 2000);
  });
  console.log(a); // 第2秒时输出: 1

  try {
      var b = await new Promise((resolve, reject) => {
          setTimeout(() => {
              reject(2);
          }, 1000);
      })
  } catch (e) {
      console.log(e); // 第3秒时输出: 2
  }

  // 函数暂停2秒后再继续执行
  var sleep = await new Promise((resolve) => {
      setTimeout(() => {
          resolve('sleep');
      }, 2000);
  });

  var c = await 3;
  console.log(c); // 第5秒时输出: 3
}

foo();
```
## async
使用async function可以定义一个一部函数，语法为：
`async function name([param[,param[,...param]]]){statements}`

async 函数的返回值很特殊：不管在函数体内return了什么值，async函数的实际返回值总是一个Promise对象，详细讲就是：
> 若在async函数中return了一个值x，不管x值是什么类型，async函数的实际返回值永远是Promise.resolce(x).

那么Promise.resolve(x)最终返回一个什么样的promise呢。MDN的介绍：
> Promise.reslove(value)方法返回一个以给定值解析后的Promise对象。但如果这个值是个thenable(即带有then方法)，返回的Promise会跟随这个thenable的对象，采用他的最终状态（指resloved/rejected/pending/settled）;否则返回成功状态返回Promise对象。

假设有一下场景：需要先通过请求1拿到数据1，然后通过请求2并携带发送数据1获取到数据2，拿到数据2之后再展示到页面。

方案一：
```
async function showData(){
  //假装请求数据1
  var data1 = await new Promise((reslove)=>{
    setTimeout(() => {
      reslove('data1');
    },1000);
  });

  // 假装请求数据2且次请求依赖数据1
  var data2 = await new Promise((reslove) => {
    setTimeout(() =>{
      reslove('data2);
    },1000);
  });

  // 展示数据2
  console.log(data2)
}

showData();
```

方案二：
```
async function getData(){
  // 假装请求数据1
  var data1 = await new Promise((reslove) => {
    setTimeout(() => {
      reslove('data1');
    },1000);
  });

  //假装请求数据2且此请求依赖数据1
  return new Promise((reslove) => {
    setTimeout(() =>{
      reslove('data2');
    },1000);
  });
}

getData().then((v)=>{
  console.log(v);
})
```

## koa-router
koa-route采用的是restful设计模式。

路由的模块化： 路由规则是域名+模块+方法

## middleware 中间件

中间件就是类似于一个过滤器的东西，在客户端和应用程序之间处理请求和响应的方法。

中间件的执行很像是一个洋葱，但并不是一层一层的执行，而是以next为界限，先执行本层中next以前的部分，当下一层中间件执行完之后，再执行本层next之后的部分。

![koa中间件洋葱模型](https://user-gold-cdn.xitu.io/2017/9/6/8b20e633ef52600242edc311a20258bd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
let koa = require('koa');
let app = new koa();

app.use((ctx, next) => {
  console.log(1)
  next(); // next不写会报错
  console.log(5)
});

app.use((ctx, next) => {
  console.log(2)
  next();
  console.log(4)
});

app.use((ctx, next) => {
  console.log(3)
  ctx.body = 'Hello World';
});

app.listen(3000);
// 打印出1、2、3、4、5
```

上述简单的应用打印出1，2，3，4，5.这个其实就是koa中间件控制的核心，一个洋葱解雇，从上往下一层一层进来，再从下网上一层一层回去，这是为了解决复杂应用中频繁的回调而设计的联级代码，并不直接把控制权交给下一个中间件，而是碰到next去下一个中间件，等下面的都执行完了，还会执行next以下的内容。

## File文件系统

node.js文件的I/O是对标准的POSIX函数的简单封装，通过require("fs")，使用该模块。所有的方法都有同步和异步的形式。

异步方法的最后一个参数都是一个回调函数，传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常如果操作成功，则第一个参数会是null或undefined

当使用同步方法时，任何异常都会被立即抛出。可以使用try/catch来处理异常，或让异常向上冒泡。

+ 做一个图片上传和图片展示的功能，需要用到以下几个方法：
```
1. existsSync 检测文件是否存在（同步方法）
2. mkdirsSyac 创建目录（同步方法）
3. readFileSync 读取文件
4. createWriteStream 创建一个写入流
5. createReadStream 创建一个读取流
6. unlinkSync 文件删除（同步方法）
```

+ 文件上传步骤：
1. 拿到上传的file对象
2. 规定好文件存放的路径
3. 创建目标路径的写入流和file.path(缓存路径)的读取流
4. 以读入流为基础放入写入流中
5. 删除缓存路径的文件
6. 数据库记录

```
file = ctx.request.body.files 
targetInfo = getFileInfo(type);

tmpPath = file.path;
type = file.type;
    
targetInfo = getFileInfo(type);

// targetInfo 包含 {targetName 文件名称,targetPaths 全路径目标目录, resultPath 加上文件名的目标目录, relativePath 相对路径目标目录}

mkdirs.mkdirsSync(targetInfo.targetPaths); // 目录
stream = fs.createWriteStream(targetInfo.resultPath);//创建一个可写流  
fs.createReadStream(tmpPath).pipe(stream);
unlinkStatus = fs.unlinkSync(tmpPath);
```
获取文件，通过readFileSync拿到Buffer形式的文件

```
// 获取文件的路径
filepath = files.find({_id: id}); //通过数据库查询拿到
ctx.body = fs.readFilesSync(filepath);
ctx.res.writeHead(200,{'Content-Type': 'image/png'})
```

## MongoDB CRUD数据库

```
let dbName = "nodeapi";
let dbHost = "mongodb://localhost/";
let mongoose = require("mongoose");
exports.connect = function(request,response){
  mongoose.connect(dbHost + dbName, {useMongoClient:true}); // useMongoCLient防止报错
  let db = mongoose.connecttion;
  db.on('open',function (callback){
    console.log('connect success');
  });
}
```

+ mongoose.Shema 字段对象模式

增删改查 modal
```
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let FilesSchema = new Schema({
    fileName: String,
    filePath: String,
    content: String,
	createTime: {
        type: Date,
        dafault: Date.now()
    },
	updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

FilesSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class Files{
    constructor() {
          this.files = mongoose.model("files", FilesSchema);
    }
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.files.find(dataArr, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    create(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.files({
                fileName: dataArr.fileName,
                filePath: dataArr.filePath,
                content: dataArr.content,
            });
            user.save(function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    delete(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.files.remove({
                _id: dataArr.id
            }, function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
}

let files = new Files()
export {files}
```

async 异步写操作数据库
```
import {files} from '../modal/files'
readFile =  async (id) => {
    try {
        let list = await files.find({_id: id});
        console.log(list)
        if(list && list.length > 0) {
            return fs.readFileSync(list[0].content);   
        } else {
            return errdata(null,'9999', 'can not find file')
        }
    } catch (err) {
        return errdata(err);
    }
}
```