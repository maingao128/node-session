# node-session
node session and socket


####研究了一下socket和node session，node的快速更新，网上的资料很多都有问题，写了一个简单demo，发现很多问题，一一总结一下

####express已经和session分开了，需要应用外部模块express-session

```

var sessionStore = new express.session.MemoryStore;
==>转换为
var session = require('express-session');
var sessionStore = new session.MemoryStore();

```
####看了一下express-session大致实现，大致流程是
	（1）cookie中没有connect.sid，生成一个connect.sid，为's:' + sessionid + '.' + sessionid.sha256(secret).base64()；
	（2）cookie中包含connect.sid，取出cookie中的connect.sid，connect.sid.slice(2,connect.sid.indexOf(’.’))截取出sessionid,再计算sessionid.sha256(secret).base64()，进行对比，通过则继续往下


####然后是socket.use(fn)部分，之前是使用socket.set('authorization', callback)，现在是中间件的形式。其中app.use(cookieParser())不能解析socket的cookie，所以还需要重新定义。

####网上没有找到合适的资料，看源码了解了其使用方法

```
socket.use(function(item,next){
	cookieParser(secret)(item.request,null,next);
});

```
待续。。。



