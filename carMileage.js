'use strict';

const petrolPriceDefault = 65.0;
const distancePerDayDefault = 14;
const numberOfDaysDefault = 22;
const kmPerLiterDefault = 35;



const totalDisance = (distancePerDay = distancePerDayDefault, numberOfDays = numberOfDaysDefault) => distancePerDay * numberOfDays;

const totalPetrolRequired = (distance = totalDisance(), kmPerLiter = kmPerLiterDefault) => distance / kmPerLiter;

const totalCostOfTravel = (requiredPetrol = totalPetrolRequired(), petrolPrice = petrolPriceDefault) => requiredPetrol * petrolPrice;

const perDayCostOfTravel = (costOfTravel = totalCostOfTravel(), numberOfDays = numberOfDaysDefault) => costOfTravel / numberOfDays;



// console.log(perDayCostOfTravel(
//     totalCostOfTravel(
//         totalPetrolRequired(totalDisance(distancePerDayDefault,numberOfDaysDefault),kmPerLiterDefault)
//         ),numberOfDaysDefault));

// const setkmPerLitre = (totalPetrolRequired,kmPerLiter = kmPerLiterDefault) => {
//     return (distance) =>{
//         return totalPetrolRequired(distance,kmPerLiter);
//     }
// }


//partial apply
const singleArgConverter = (func , ...arg) => {
    return(val) => {
        return func(val,...arg);
    }
};


const petrolRequiredCalculator = singleArgConverter(totalPetrolRequired,kmPerLiterDefault);

const costOfTravelCalculator = singleArgConverter(totalCostOfTravel,petrolPriceDefault);

const perDayCostOfTravelCalculator = singleArgConverter(perDayCostOfTravel, numberOfDaysDefault);


//function composition
const funcComposer = (...funcs) => {
    return (...args) => {
        funcs.forEach((func)=>{
            args = [func.apply(this,args)];
        });

        return args[0];
    }
};

const fuelCostCalculator = funcComposer(totalDisance,petrolRequiredCalculator,costOfTravelCalculator,perDayCostOfTravelCalculator);

console.log(fuelCostCalculator(distancePerDayDefault,numberOfDaysDefault));

//currying distance function

const curriedDistanceCalculator = () => {
    return (totalDistance) => {
        return (distancePerDay) => {
            return (numberOfDays) => {
                return totalDistance(distancePerDay, numberOfDays);
            }
        }
    }
};

let distanceSetter = curriedDistanceCalculator(totalDisance);
let numberOfDaysSetter = distanceSetter(14);


(curriedDistanceCalculator)(totalDisance)(distancePerDayDefault)(numberOfDaysDefault);

module.exports.fuelCostCalculator = fuelCostCalculator;