function sayHello(name){
    return "Hello "+name;
}

function oneToTwo(arg){
	if(arg>-1&&arg<10){
		return "0"+arg;
	}else{
		return arg;
	}
}
function toFour(arg){
	if(arg<10){
		return "00"+arg;
	}else if(arg<100){
		return "0"+arg;
	}else{
		return arg;
	}
}

var success=0;
var fail=0;
var count=0,sum=4;
var detail="";
describe("A suite of basic functions", function() {
    var name;
	
	afterEach(function() {
		
		//var flag = jasmine.HtmlReporterHelpers.getSpecStatus(this);
		//flag=="passed"?success++ : fail++;
		count++;
		//发送的测试结果数据格式为  测试编号#设备型号#设备uuid#操作系统平台#平台的版本号#成功数#失败数#测试时间#失败详情
		/*
		if(count==sum){
			var temp = success+":"+fail;
			var myDate = new Date();
			var testTime = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+"-"+myDate.getMinutes()+"-"+myDate.getSeconds();
			temp = temp+":"+testTime;
			//temp = device.model+":"+device.uuid+":"+device.platform+":"+device.version+":"+temp;'MI 1S:3.5.0:Android:f315044e67dfc55592:4.0.4' ;  
			temp = "MI 1S:f315044e67dfc55592:Android:4.0.4:"+temp;
			var socket = io.connect('http://localhost:4096/testResult.io');
			socket.emit('testResult',temp);
			setTimeout(function(){
				location.reload();
			},200);
		}
		*/
		alert(this);
		var singleResult = this.results().getItems()[0];
		if(singleResult != 'Passed.'){
			fail++;
			if(singleResult.trace.stack){
				detail = "\n"+detail+"Failed Spec : "+this.description+"\n"+singleResult.trace.stack+"\n\n";
			} else {
				detail = "\n"+detail+singleResult;
			}
		}else{
			success++;
		}
		if(count==sum){
			var id = Math.floor(100+Math.random()*899);
			var temp ="MI 1S#f315044e67dfc55592#Android#4.0.4#"+success+"#"+fail+"#";
			var myDate = new Date();
			id = ""+oneToTwo(myDate.getHours())+oneToTwo(myDate.getMinutes())+oneToTwo(myDate.getSeconds())+toFour(myDate.getMilliseconds())+id;
			var testTime = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+"-"+myDate.getMinutes()+"-"+myDate.getSeconds();
			//alert("testTime:"+testTime);
			temp = temp + testTime +"#"+detail;
			temp = id+"#"+temp;
			//alert(temp);
			var socket = io.connect('http://localhost:4096/testResult.io');
			socket.emit('testResult',temp);
			/*每过一秒钟重新加载一次测试页面
			setTimeout(function(){
				location.reload();
			},1000);
			*/
		}
		
	});
	
	
    it("sayHello", function() {
        name = "Conan";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
	
	it("spec2", function() {
        name = "Conan";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
	
	it("spec3", function() {
        name = "Conans";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
	it("spec4", function() {
        name = "lllll";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
});