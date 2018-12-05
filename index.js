const           events          =   require('events'),
                http            =   require('http'),
                PORT            =   process.env.PORT || 3000;
                eventsConfig    =   require('./Resturant/config.js').events,
                Resturant       =   require('./Resturant/resturant_module');

let allTheMessages = require('./Resturant/resturant_module').allTheMessages;
          


let theResturant = new Resturant();
theResturant.on(eventsConfig.CANCELL_ALL    ,   theResturant.deleteAllOrders);
theResturant.on(eventsConfig.ADD_ONE        ,   theResturant.increaseNumOfOrders);
theResturant.on(eventsConfig.REMOVE_ONE     ,   theResturant.decreaseNumOfOrders);
theResturant.on(eventsConfig.PRINT_ALL      ,   theResturant.printAllGuests);



http.createServer(function (req , res) {
    
    /* The IF statement is for making sure that the "favicon.ico" call that being automatically
    fetched by the browsers will not be displayed.*/
    if (req.url != '/favicon.ico') {
        // DEMO --> START //

        theResturant.addOrder(`Yaniv` , 4 , false);
        theResturant.addOrder(`Amit` , 2 , true);
        theResturant.addOrder(`Smamit` , 3 , true);
    
        theResturant.printOrders();
    
        theResturant.deleteOrder();
    
        theResturant.cancelAllOrders();
    
        theResturant.addOrder(`Moti` , 4 , false);
        
        theResturant.printOrders();
        
        // DEMO --> END //

        
        res.writeHeader(200);
        res.end(JSON.stringify(allTheMessages));
    }
}).listen(PORT);
console.log(`listening on port ${PORT}`);




