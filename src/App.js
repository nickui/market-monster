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
    // GET request for stock data

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
