import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var config = {
  headers: {
    // 'crossDomain': true, 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
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
    axios.get(`https://quandl.com/api/v3/datatables/WIKI/PRICES?ticker=${this.props.ticker}&date=2017-11-16&api_key=zyrYsZstgPbhDmNUupNy`, config)
    // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div>
        <h1>{`/r/${this.props.ticker}`}</h1>
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
