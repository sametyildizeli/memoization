const memoization = require('./memoizaton');
const expect = require('chai').expect;

// hint: use https://sinonjs.org/releases/v6.1.5/fake-timers/ for faking timeouts

describe('memoization', function () {  

    //It holds the key and argument values and they will be cached in the memoCache 
    // like : {'c544d3ae-a72d-4755-8ce5-d25db415b776' : 5}. So when send the key and resolver and memoCache has them, will be
    // return. If memoCache has not them, it will be saved as an array element.
    
    //           ABOUT THE DIFFERENT VARIABLE : 
    // This method could be used for every variable (array, string, int, boolean etc.). Because the important point here,
    // there are two variables and one of them is key, the other one is value. So we have a variable (string, integer etc.) that  
    // has a value. We can think them like a dictionary. 
    it('should memoize function result - string(key) - integer(value) ', () =>{
        let returnValue = 5;
        const testFunction =  (key) => returnValue;       //It returns the returnValue to equels testFunction

        //returnValue is cached together with the key value ('c544d3ae-a72d-4755-8ce5-d25db415b776')
        //System will be memorized the variables as resolver and argument.
        const memoized = memoization.memoize(testFunction, (key) => key, 1000); 
        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);

        returnValue = 10;

        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);
    });

    // TODO additional tests required

    it('should memoize function result - (string(key) - string(value)) ', () =>{
        let returnValue = 'string_value';
        const testFunction =  (key) => returnValue;       //It returns the returnValue to equels testFunction

        const memoized = memoization.memoize(testFunction, (key) => key, 1000);
        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal('string_value');

        returnValue = 'new_string_value';

        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal('string_value');
    });


    it('should memoize function result - (int(key) - int(value)) ', () =>{
        let returnValue = 5;
        const testFunction =  (key) => returnValue;       //It returns the returnValue to equels testFunction

        const memoized = memoization.memoize(testFunction, (key) => key, 1000);
        expect(memoized(25)).to.equal(5);

        returnValue = 30;

        expect(memoized(25)).to.equal(5);
    });

    it("should memoize function result - array(key) - int(value)", () => {
        let returnValue = 5;
        const testFunction = key => returnValue;
        const memoized = memoization.memoize(testFunction);
    
        expect(memoized(["array1"])).to.equal(5);
        returnValue = 10;
        expect(memoized(["array1"])).to.equal(5);
        expect(memoized(["array2"])).to.equal(10);
        returnValue = 15;
        expect(memoized(["array2"])).to.equal(10);
      });

    // ----  FORGET THE MEMOIZATION  ----

    it('should FORGET memoize function result after the TIMEOUT (string - integer) ', () =>{
        let returnValue = 5;
        const testFunction =  (key) => returnValue;       //It returns the returnValue to equels testFunction

        const memoized = memoization.memoize(testFunction, (key) => key, 1000);
        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);
       
        var lolex=require("lolex");      //For the timeout (used hint link)
        lolex.install();   

        setTimeout(() => {
            console.log('tick');        //will print after 6005ms
            expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.not.equal(5);
        },6000);

        returnValue = 10;   
    });

});