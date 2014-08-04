(function() {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	
	var txtReporter = new TextReporter();
	txtReporter.onRunnerFinished(function (text) {
		// Do something with text //
		alert(text);
	});
	
	//jasmine×Ô´øµÄHTMLReport
	/*
	var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };*/
	jasmineEnv.addReporter(txtReporter);
	
	//jasmineEnv.addReporter(htmlReporter);

	window.onload = function() {
		jasmineEnv.execute();
	};

})();