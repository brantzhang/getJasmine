function sayHello(name){
    return "Hello "+name;
}
var success=0;
var fail=0;
var count=0,sum=3;
describe("A suite of basic functions", function() {
    var name;
	/*
	afterEach(function() {
		jasmine.HtmlReporter.SuiteView.prototype.status();
		var flag = jasmine.HtmlReporterHelpers.getSpecStatus(this);
		flag=="passed"?success++ : fail++;
		count++;
		if(count==sum){
			alert("success:"+success+"; failed:"+fail);
		}
		//alert("it---"+);
		//alert(jasmine.HtmlReporter.self);
		//alert(showDetails());
		//alert(JSON.stringify(jasmine.HtmlReporterHelpers));
		//alert(jasmine.HtmlReporter.ReporterView(jasmine.HtmlReporter.dom).passedCount);
		//alert(jasmine.HtmlReporter.ReporterView(window.document).passedCount);
		//var ff=jasmine.TrivialReporter.prototype.log;
		//alert("ffff:"+jasmine.Suite.prototype.results);
	});
	*/
	
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
});


//alert("-------"+jasmine.HtmlReporter.reportSuiteResults(this));

//alert(jasmine.HtmlReporter.ReporterView(this).passedCount);