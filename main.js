const arrItemFood = ['CHOCOLATE BAR', 'BOX OF CHOCOLATES', 'BOXES OF CHOCOLATES', 'COKE', 'BEER', 'CHEESE']
const arrItemMedical = ['PACKET OF HEADACHE PILLS', 'VAXINE', 'SYRINGE', 'ANTIBIOTIC']
const arrItemGood = ['MUSIC CD', 'BOTTLE OF PERFUME', 'SHOES', 'T-SHIRT', 'PENCIL']
const arrItemExcludedFromTax = ['BOOK']


function calculateTaxAndTotalAmount(input){
  var totalAmount = 0;
  input = input.replace(/(?:\r\n|\r|\n)/g, '|');
  arrItems = input.split('|');
  var basketTotalAmount = 0;

  arrItems.forEach ( (item) => {
    itemData = item.split(' ');
    quantity = parseInt(itemData[0]);
    itenName = itemData.slice(1, itemData.length - 2).join(' ');
    totalAmount = 0;

    unitAmount = parseFloat(item.split(' ')[itemData.length - 1])
    totalAmountItem = quantity * unitAmount;

    if(!isItExluded(itenName)){
      totalAmount += totalAmountItem * 0.1;
    }

    if(isItImported(itenName)){
      totalAmount += totalAmountItem * 0.05;
    }


    basketTotalAmount += totalAmount;
    console.log(`${quantity} ${itenName} ${(totalAmount + totalAmountItem).toFixed(2)}`)
  });

  console.log('Sales Taxes: ', roundNextHigher5(basketTotalAmount).toFixed(2))
}

function find(type, value){

  value = value.toUpperCase();
  value = value.replace('IMPORTED ', '')

  if (type == 'FOOD') {
    if(arrItemFood.indexOf(value) != -1) {
      return true
    }
  } else if (type == 'MEDICAL') {
    if(arrItemMedical.indexOf(value) != -1) {
        return true
      }
  } else if (type == 'GOOD') {
    if(arrItemGood.indexOf(value) != -1) {
      return true
    }
  } else if (type == 'EXCLUDED') {
    if(arrItemExcludedFromTax.indexOf(value) != -1) {
      return true
    }
  } else {
    throw new Error('Good not found');
  }
}

function isItExluded(value) {
  if (find('EXCLUDED', value) || find('FOOD', value) || find('MEDICAL', value)){
    return true;
  }

  return false;
}

function isItImported(value) {
  if (value.split(' ')[0].toUpperCase() == 'IMPORTED'){
    return true
  }

  return false;
}

function roundNextHigher5 (n) {
  return Math.ceil(n / 0.05) * 0.05;
}

calculateTaxAndTotalAmount(`2 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`)