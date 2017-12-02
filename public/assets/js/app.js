// import axios from 'axios';

var config = {
  headers: {
    // 'crossDomain': true, 
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

function getStockData() {
    ticker = document.getElementById('ticker').value;
    axios.get(`https://api.iextrading.com/1.0/stock/` + ticker + `/quote`, config)
    .then(res => {
        console.log("Company Name: " + res.data.companyName); // store this
        console.log("Stock Ticker: " + res.data.symbol); // store this
        console.log("Sector: " + res.data.sector); // store this
        console.log("Latest Price: " + res.data.latestPrice); // store this (current price)
        console.log("Open Price: " + res.data.open); 
        console.log("Close Price: " + res.data.close); 
        console.log("Date: " + res.data.latestTime);
        console.log("Epoc Date: " + res.data.latestUpdate); // store this (buy date)
    });
}
