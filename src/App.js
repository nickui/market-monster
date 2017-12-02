import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var config = {
  headers: {
    // 'crossDomain': true, 
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
  //   axios.get(`https://cors-anywhere.herokuapp.com/https://www.quandl.com/api/v3/datatables/WIKI/PRICES?ticker=${this.props.ticker}&date=2017-11-16&api_key=zyrYsZstgPbhDmNUupNy`)
  //   .then(res => {
  //     console.log(res.data)
  // })
  //   .catch(function (error) {
  //     console.log(error);
  // });
    
    // const axios = require("axios");
    // const url =
    //   `https://quandl.com/api/v3/datatables/WIKI/PRICES?ticker=AAPL&date=2017-11-16&api_key=zyrYsZstgPbhDmNUupNy`;
    // axios
    //   .get(url)
    //   .then(response => {
    //     console.log(
    //       `City: ${response.data.results[0]} -`,
    //       `Latitude: ${response.data.results[0].geometry.location.lat} -`,
    //       `Longitude: ${response.data.results[0].geometry.location.lng}`
    //     );
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    
    
    // No third party module required: https is part of the Node.js API
    // const https = require("https");
    // const url =
    //   `https://quandl.com/api/v3/datatables/WIKI/PRICES?ticker=${this.props.ticker}&date=2017-11-16&api_key=zyrYsZstgPbhDmNUupNy`;
    // https.get(url, res => {
    //   res.setEncoding("utf8");
    //   let body = "";
    //   res.on("data", data => {
    //     body += data;
    //   });
    //   res.on("end", () => {
    //     body = JSON.parse(body);
    //     console.log(
    //       `Data: ${body.results[0].datatable} -`
    //     );
    //   });
    // });
    // GET request for remote image

    axios.get(`https://api.iextrading.com/1.0/stock/aapl/quote`, config)
    // axios.get(`https://cors-anywhere.herokuapp.com/https://quandl.com/api/v3/datatables/WIKI/PRICES/?ticker=${this.props.ticker}&date=2017-11-16&api_key=zyrYsZstgPbhDmNUupNy`, config)
    // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        console.log("Stock Ticker: " + res.data.symbol);
        console.log("Sector: " + res.data.sector);
        console.log("Open Price: " + res.data.open);
        console.log("Close Price: " + res.data.close);
        console.log("Date: " + res.data.latestTime);
        // console.log("Stock Ticker: " + res.data.datatable.data[0][0]);
        // console.log("Stock Open Price: $" + res.data.datatable.data[0][2]);
        // console.log("Stock Close Price: $" + res.data.datatable.data[0][5]);
        // const posts = res.data.datatable.data.map(obj => obj.data);
        // this.setState({ posts });
      });
  }

  render() {
    return (
      <div>
        <h1>{`${this.props.ticker}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App ticker="AAPL"/>,
  document.getElementById('root')
);

export default App;
