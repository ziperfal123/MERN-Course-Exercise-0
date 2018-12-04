const           events          =   require('events'),
                eventsConfig    =   require('./config.js').events;


const MAX_ORDERS = 5;
let allTheMessages = [];


class Order {
  constructor(_guestName, _numberOfPeople, _allergicOrNot) {
    this.guestName = _guestName;
    this.numberOfPeople = _numberOfPeople;
    this.allergicToPeanuts = _allergicOrNot;
  }
}


module.exports = class Resturant extends events.EventEmitter {
  constructor() {
    super();
    this.arrOfOrders = [];
  }

  printOrders() {
    this.emit("PrintTheGuests");
  }

  cancelAllOrders() {
    if (this.arrOfOrders.length > 0) {
        while (this.arrOfOrders.length > 0) 
            this.arrOfOrders.pop();
        this.emit("ZeroOrders");
    }
  }

  addOrder(_guestName, _numberOfPeople, _allergicToPeanuts) {
    if (this.arrOfOrders.length < MAX_ORDERS) {
      let orderToPush = new Order(_guestName , _numberOfPeople , _allergicToPeanuts);
      this.arrOfOrders.push(orderToPush);
    }
    this.emit("IncreaseOne");
  }

  deleteOrder() {
    if (this.arrOfOrders.length > 0) {
      this.arrOfOrders.pop();
    }
    else {
      saveAllMessagesInArray("the number of orders is 0! can not decrease to a negative number of orders");
        console.log(`the number of orders is 0! can not decrease to a negative number of orders.`);
    }  
        this.emit("DecreaseOne");
  }


    //CALLBACKS (As part of the Resturant Class)//

  deleteAllOrders() {
    allTheMessages.push('All the orders were deleted');
    console.log(`All the orders were deleted.`);
  }

  increaseNumOfOrders() {
    if (this.arrOfOrders.length < MAX_ORDERS) {
      if (this.arrOfOrders.length === 1){
        saveAllMessagesInArray(`an Order has been added. there is ${
          this.arrOfOrders.length} order in the resturant now.`);
        console.log(`an Order has been added. there is ${this.arrOfOrders.length} order in the resturant now.`);
      }
      else{
        saveAllMessagesInArray(`an Order has been added. there are total of ${
          this.arrOfOrders.length} orders in the resturant now.`);
        console.log(`an Order has been added. there are total of ${this.arrOfOrders.length} orders in the resturant now.`);
      }
    } else {
      saveAllMessagesInArray(`can not add more orders. There are maximum of ${this.arrOfOrders.length} orders at the moment.`);
        console.log(`can not add more orders. There are maximum of ${this.arrOfOrders.length} orders at the moment.`);
    }
      
  }

  decreaseNumOfOrders() {
    if (this.arrOfOrders.length === 0) {
      saveAllMessagesInArray(`an order has been removed. There are no orders in the resturant now.`);
        console.log(`an order has been removed. There are no orders in the resturant now.`);
    }
    else if (this.arrOfOrders.length === 1 ) {
      saveAllMessagesInArray(`an order has been removed. There is ${this.arrOfOrders.length} order in the resturant now.`);
        console.log(`an order has been removed. There is ${this.arrOfOrders.length} order in the resturant now.`);
    }
    else {
      saveAllMessagesInArray(`an order has been removed. There are ${this.arrOfOrders.length} orders in the resturant now`);
        console.log(`an order has been removed. There are ${this.arrOfOrders.length} orders in the resturant now`);
    }
        
  }

  printAllGuests() {
    if (this.arrOfOrders.length > 0) {
      let arrLength = this.arrOfOrders.length;
      console.log("");
      for (let i = 0; i < arrLength; i++) {
        saveAllMessagesInArray(`Order #${i + 1}: Guest Name: ${
          Object.entries(this.arrOfOrders[i])[0][1]} --> ${Object.entries(this.arrOfOrders[i])[1][1]} People.`);
          console.log(`Order #${i + 1}: Guest Name: ${
          Object.entries(this.arrOfOrders[i])[0][1]} --> ${Object.entries(this.arrOfOrders[i])[1][1]} People.`);
      }
      console.log("");
    } else {
        saveAllMessagesInArray(`There are 0 guests.`);
        console.log(`There are 0 guests.`);
    }
  }


}



let saveAllMessagesInArray = (messageToPush) => {
  allTheMessages.push(messageToPush);
}

module.exports.allTheMessages = allTheMessages;