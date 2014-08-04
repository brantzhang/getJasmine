var express = require('express');    
var app = express();   
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//post�ύ��������Ҫʹ��body-parser�м��ģ��,���Ҳ����Ļ�ȡ��ʽҲ��get��һ��
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
	//��ȡĿǰ�Ĳ�������֮ǰ�����֣�
	var data = fs.readFileSync("./spec/flag","utf-8");
	//����Ŀǰ�Ĳ���������Ҳ���ǻָ���֮ǰ������
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
		strs = request.split(":");//strs[0]Ϊѡ��Ĳ����������ƣ�strs[1]Ϊ�˴β��ԵĴ���
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
