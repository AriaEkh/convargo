'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];
//Step1
function newPrice()
{
  deliveries.forEach(shipper => {
  truckers.forEach(trucker => {
    if(trucker.id==shipper.truckerId)
    { 
      
      if(shipper.volume>25 )
      {
        trucker.pricePerVolume=trucker.pricePerVolume*0.5;
      }
     
      else if(shipper.volume>10 )
      {
        trucker.pricePerVolume=trucker.pricePerVolume*0.7;
      }
      else if(shipper.volume>5 )
      {
        trucker.pricePerVolume=trucker.pricePerVolume*0.9;
      }
     
      shipper.price=shipper.distance*trucker.pricePerKm+shipper.volume*trucker.pricePerVolume;
    }

   
  });
  
});
}
function newCommission()
{ 
 
  deliveries.forEach(shipper => {
    var commission=shipper.price*0.7;
    shipper.commission.insurance=commission*0.5;
    shipper.commission.treasury=parseInt(shipper.distance/500);
    shipper.commission.convargo=commission-shipper.commission.insurance-shipper.commission.treasury;
    

    
  });
}

function newDeductible(deliverie){
  if(deliverie.options.deductibleReduction){
            deliverie.price = deliverie.price + deliverie.volume;
        }
      return deliverie;
  }
 
function payActors(){
 var deliverie;
 actors.forEach(function(actor){
    deliverie = deliveries.find(function(element){
      if(element.id == actor.deliveryId){
        return element;
        }
    });
  actor.payment.find(function(element){
    if(element.who == "shipper"){
      element.amount = deliverie.price;
      }
      else if(element.who == "trucker"){
          element.amount = deliverie.price * 0.7;
      }
      else if(element.who == "treasury"){
          element.amount = deliverie.commission.treasury
      }
      else if(element.who == "insurance"){
          element.amount = deliverie.commission.insurance;
      }
      else if(element.who == "convargo"){
          element.amount = deliverie.commission.convargo;
      }
    });
  });
}

newPrice();
newCommission();
newDeductible();
payActors();


console.log(truckers);
console.log(deliveries);
console.log(actors);
