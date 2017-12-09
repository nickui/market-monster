// import axios from 'axios';

var config = {
    headers: {
      // 'crossDomain': true, 
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
  };
  
  var user = {
      bankBalance: 30000,
      stockBuys: [],
  }
  
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
  
          var companyNameCell = document.createElement("td");
          companyNameCell.innerHTML = res.data.companyName;
          var stockPriceCell = document.createElement("td");
          stockPriceCell.innerHTML = res.data.latestPrice;
          var buyButtonCell = document.createElement("td");
          // buyStock('APPL', 1.23, 1234553);
          buyButtonCell.innerHTML = '<button type="button" class="btn btn-primary" onclick="buyStock(\'' + res.data.symbol + '\', ' + res.data.latestPrice + ', ' + res.data.latestUpdate + ');">Buy</button>';
          var row = document.createElement("tr");
          row.appendChild(companyNameCell);
          row.appendChild(stockPriceCell);
          row.appendChild(buyButtonCell);
          var tBody = document.querySelector("#buyStock > tbody");
          tBody.appendChild(row);
          document.getElementById('ticker').value = "";
      })
      .catch(function (error) {
          console.log("Stock Not Found!");
      });
  }
  
  // allow enter key to submit the ticker field
  document.querySelector("#ticker").addEventListener("keyup", function(event) {
      if(event.key !== "Enter") return;
      document.querySelector("#tickerBTN").click(); 
      event.preventDefault(); 
  });
  
  function buyStock(currentStockTicker, currentStockPrice, currentStockBuyDate) {
      // make sure bank account can afford it
      if (user.bankBalance > currentStockPrice) {
          // subtract currentStockPrice from bankBalance
          user.bankBalance -= currentStockPrice;
          // user.stocks (each stock has a ticker, price, currentStockBuyDate, quantity)
          var stock = {
              ticker: currentStockTicker,
              // companyName: companyName,
              // sector: currentSector,
              price: currentStockPrice,
              epocDate: currentStockBuyDate,
              quantity: 1
          }
          // add new record to users.stocksPurchases
          user.stockBuys.push(stock);
          $.post("/api/buy", user);
      }
      else{
          console.log("You poor!")
      };
  }