function sayHello(name){
    return "Hello "+name;
}

describe("Spec Test3", function() {
    var name;

    it("Spec 3", function() {
        name = "Conan";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
});
