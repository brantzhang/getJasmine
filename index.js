var express = require('express');    
var app = express();   
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//post提交的数据需要使用body-parser中间件模块,而且参数的获取方式也和get不一样
app.use(require('body-parser').urlencoded({extended: true}));
app.get('/spec', function(req, res){
	res.sendfile('selectSpec.html');
});

app.get('/test.js',function(req,res){
	res.sendfile('./spec/test.js');
});

app.get('/testDetail',function(req,res){
	//console.log("**********"+req.param("id"));
	res.sendfile('testDetail.html');
});

function getFileContent(filename){
	var data = fs.readFileSync(filename,"utf-8");
	return data;
}
 
function selectTestSpec(filename){
	//获取目前的测试用例之前的名字，
	var data = fs.readFileSync("./spec/flag","utf-8");
	//撤销目前的测试用例，也就是恢复其之前的名字
	fs.renameSync("./spec/test.js", "./spec/"+data);
	fs.renameSync("./spec/"+filename, "./spec/test.js");
	fs.writeFileSync("./spec/flag",filename);	
}

var specio = io.of('/selectspec.io');
specio.on('connection',function(socket){
	//specio.emit("selectSpec", getCurrentSpec());
	specio.emit("selectSpec", getFileContent("./spec/flag"));
	fs.readdir('./spec', function(err, files) {
		if (err) {
			console.log('read dir error');
		} else {
			specio.emit("specLib",files);
		}
	});
	socket.on('theSpec',function(request){
		var strs = new Array();
		strs = request.split(":");//strs[0]为选择的测试用例名称，strs[1]为此次测试的次数
		selectTestSpec(strs[0]);
	});

});


var ssio = io.of('/testResult.io');
ssio.on('connection',function(socket){
	console.log('ssio in connection!');
	
	socket.on('testResult',function(request){
		//console.log("Result---"+request);
		var strs = request.split("#");
		fs.writeFile("./log/"+strs[0]+".log",request,function(err){
			if(err){
				console.log("wirten log error!");
				throw err;
			}
		});
		specio.emit('testResult',request);
	});
	
	socket.emit('sendData',"I am from Server");
});

var detailio = io.of('/testDetail.io');
detailio.on('connection',function(socket){
	console.log('detailio in connection!');
	socket.on('detailId',function(request){
		console.log("detail name="+request);
		socket.emit('detail',getFileContent("./log/"+request));
	});
	
});


http.listen(4096, function(){
  console.log('listening on *:4096');
});
