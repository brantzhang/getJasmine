function sayHello(name){
    return "Hello "+name;
}

describe("Spec Test2", function() {
    var name;

    it("Spec 1", function() {
        name = "Conan";
        var exp = "Hello Conan";
        expect(exp).toEqual(sayHello(name));
    });
});
