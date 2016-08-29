/**
 * Created by AbhishekG on 8/29/2016.
 */
'use strict';
var carMileage = require("../carMileage");

var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();


const a = () => {
    return "1";
}

//describe('MyFunction', function() {
    describe('#checkReturnedValue', function() {
        it('should return string', function() {
            let returnedValue = carMileage.fuelCostCalculator(14,22) ;
            returnedValue.should.equal(26);
        });
    });
//});