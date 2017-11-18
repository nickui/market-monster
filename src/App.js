import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import socket from 'socket.io';
import $ from 'jquery';
import _ from 'lodash';


$(document).ready(function() {
	$(document).on('mouseenter', '.removeItem', function() {
		$(this).css('background-color', 'white');
	});
	$(document).on('mouseleave', '.removeItem', function() {
		$(this).css('background-color', '');
	});
	
	$(document).on('mouseenter', '.rangeBtn', function() {
		$(this).css('color', 'white');
	});
	$(document).on('mouseleave', '.rangeBtn', function() {
		$(this).css('color', '');
	});
	
	$(document).on('mousedown', '.rangeBtn', function() {
		$(this).css('box-shadow', 'inset 0px 0px 1px 2px #808080');
	});
	$(document).on('mouseup', '.rangeBtn', function() {
		$(this).css('box-shadow', '');
	});
	
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { stockList: [], range: "year" }; 
		this.submitStock = this.submitStock.bind(this); //client adds stock via toolbar
		this.removeStock = this.removeStock.bind(this); //client removes stock via toolbar
		this.addStock = this.addStock.bind(this); //add stock via WS 
		this.remStock = this.remStock.bind(this); //remove stock via WS 
		this.changeRange = this.changeRange.bind(this); //change date range
	}
	
	componentDidMount() {
		socket.on('stockAdded', this.addStock);
		socket.on('stockRemoved', this.remStock);
		
		if ((stocks)!=null) {
			var stockArr = [];
			stocks.forEach(function(stock) {
				stockArr.push(stock.code);
			});
			
			var dataArr = []; 
			var callArr = [];
			
			for (var i=0; i<stockArr.length; i++) { //prepopulate the state with stocks from db on first mount
				var today = new Date();
				var dateStr = (today.getYear()+1900-1) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate()); //for one year
				callArr = $.ajax({
								url:'https://www.quandl.com/api/v3/datasets/WIKI/' + stockArr[i] +'.json?api_key=fsT69Hcx4jABAz-GygyD' + '&start_date=' + dateStr,
								dataType:'json',
								success:function(data) {
									var obj = { code: data.dataset.dataset_code, name: data.dataset.name, value: data.dataset.data[0][1], data: data.dataset.data };
									dataArr.push(obj);
									this.setState({ stockList: dataArr.slice() });
									
								}.bind(this),
								failure:function(err) {
									console.log("Failure getting stock data.");
								}
					
				});
				
			}
		}
		
		
	}
	
	addStock(data) { //add stock via socket event 
		var addBool = true;
		for (var i=0; i<this.state.stockList.length; i++) {
			if (this.state.stockList[i].code==data.code) {
				addBool = false;
			}
		}
		if (addBool) { //if not already in list, add 
			var arr = this.state.stockList.slice();
			var today = new Date();
			var dateStr = (today.getYear()+1900-1) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate()); //for one year
			$.ajax({
						url:'https://www.quandl.com/api/v3/datasets/WIKI/' + data.code +'.json?api_key=fsT69Hcx4jABAz-GygyD' + '&start_date=' + dateStr,
						dataType:'json',
						success:function(data) {
							var obj = { code: data.dataset.dataset_code, name: data.dataset.name, value: data.dataset.data[0][1], data: data.dataset.data };
							arr.push(obj);
							this.setState({ stockList: arr.slice() });
						}.bind(this),
						failure:function(err) {
							console.log("Failure getting stock data.");
						}
						
						
					});
		}
	}
	
	remStock(data) { //remove stock via socket event
		var index = -1;
		var arr = this.state.stockList.slice();
		for (var i=0; i<arr.length; i++) {
			if (arr[i].code == data.code) {
				index = i;
			}
		}
		if (index!=-1) {
			arr.splice(index,1); 
			this.setState({ stockList: arr.slice() });
		}
		
	}
	
	submitStock(code) { //add stock to tracking list
		var arr = this.state.stockList.slice();
		var today = new Date();
		var dateStr;
		var rng = this.state.range;
		if (rng=="mo") {
			if (today.getMonth()==0) { 
				dateStr = (today.getYear()+1900-1) + "-" + "12" + "-" + formatNum(today.getDate());
			}
			else {
				dateStr = (today.getYear()+1900) + "-" + formatNum(today.getMonth()) + "-" + formatNum(today.getDate()); 
			}
		}
		else if (rng=="3mo") {
			today.setMonth(today.getMonth() - 3);
			dateStr = (today.getYear()+1900) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate()); 
		}
		else if (rng=="year") {
			dateStr = (today.getYear()+1900-1) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate());
		}
		else {
			dateStr = (today.getYear()+1900-3) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate());
		}
		$.ajax({
					url:'https://www.quandl.com/api/v3/datasets/WIKI/' + code +'.json?api_key=fsT69Hcx4jABAz-GygyD' + '&start_date=' + dateStr,
					dataType:'json',
					success:function(data) {
						var obj = { code: data.dataset.dataset_code, name: data.dataset.name, value: data.dataset.data[0][1], data: data.dataset.data };
						arr.push(obj);
						socket.emit('addingStock', { code: obj.code }); //when adding the stock, emit via socket.io to update other clients
						this.setState({ stockList: arr.slice() });
					}.bind(this),
					failure:function(err) {
						console.log("Failure getting stock data.");
					}
					
					
				});
	}
	
	removeStock(code) { //remove stock from list
		var index = -1;
		var arr = this.state.stockList.slice();
		for (var i=0; i<arr.length; i++) {
			if (arr[i].code == code) {
				index = i;
			}
		}
		arr.splice(index,1); 
		socket.emit('removingStock', { code: code }); //emit the removeStock event to update all clients
		this.setState({ stockList: arr.slice() });
	}
	
	changeRange(rng) { //change date range
		//first must convert all current stocks 
		var codeArr = this.state.stockList.map(function(stock) {
			return stock.code;
		});
		
		var dataArr = [];
		var callArr = [];
		var today = new Date();
		var dateStr;
		if (rng=="mo") {
			if (today.getMonth()==0) { 
				dateStr = (today.getYear()+1900-1) + "-" + "12" + "-" + formatNum(today.getDate());
			}
			else {
				dateStr = (today.getYear()+1900) + "-" + formatNum(today.getMonth()) + "-" + formatNum(today.getDate()); 
			}
		}
		else if (rng=="3mo") {
			today.setMonth(today.getMonth() - 3);
			dateStr = (today.getYear()+1900) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate()); 
		}
		else if (rng=="year") {
			dateStr = (today.getYear()+1900-1) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate());
		}
		else {
			dateStr = (today.getYear()+1900-3) + "-" + formatNum(today.getMonth()+1) + "-" + formatNum(today.getDate());
		}
		
		for (var i=0; i<codeArr.length; i++) { //prepopulate the state with stocks from db on first mount
				callArr = $.ajax({
								url:'https://www.quandl.com/api/v3/datasets/WIKI/' + codeArr[i] +'.json?api_key=fsT69Hcx4jABAz-GygyD' + '&start_date=' + dateStr,
								dataType:'json',
								success:function(data) {
									var obj = { code: data.dataset.dataset_code, name: data.dataset.name, value: data.dataset.data[0][1], data: data.dataset.data };
									dataArr.push(obj);
									this.setState({ stockList: dataArr.slice(),range: rng });
								}.bind(this),
								failure:function(err) {
									console.log("Failure getting stock data.");
								}
					
				});
				
		}
		
	}
	
	render() {
		return <div className="container">
			<Chart stockList={this.state.stockList.slice()} range={this.state.range} changeRange={this.changeRange} />
			<ToolBar stockList={this.state.stockList.slice()} submitStock={this.submitStock} removeStock={this.removeStock} />
		</div>;
	}
}

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidUpdate() { //draw graph
		d3.select('svg').remove();
		if (this.props.stockList.length>0) {
				var margin = { top:25, right:25, bottom:25, left:25 };
				var width = $('.chartContainer').width() - margin.left - margin.right;
				var height = $('.chartContainer').height() - margin.top - margin.bottom;
				
				var bisectDate = d3.bisector(function(d) { return d.date; }).right; 
				
				var svg = d3.select('.chartContainer').append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
				
				
				var dataObjs = this.props.stockList.slice();
				
				var arr = dataObjs.map(function(item) {
					return { data: item.data, name: item.code }; 	
						
				});
				
				arr = arr.map(function(item) { //array that holds stock info
					var obj; 
					var ret = [];
					for (var i=0; i<item.data.length; i++) {
						obj = { name: item.name, date: item.data[i][0], value: item.data[i][1] };
						ret.push(obj);
					}
					return ret.slice();
				});
				
				var allValues = [];  //for calculating min/max 
				var allDates = [];
				
				for (var i=0; i<arr.length; i++) {
					for (var j=0; j<arr[i].length; j++) {
						allValues.push(arr[i][j].value);
						allDates.push(arr[i][j].date);
					}
				}
				
				var maxValue = d3.max(allValues);
				var minValue = d3.min(allValues);
				
				var formatDate = d3.time.format('%Y-%m-%d'); //for creating Date obj from strings
				
				var x = d3.time.scale().domain(d3.extent(allDates, function(d) { return formatDate.parse(d); })).range([0,width]); //x scale
				var y = d3.scale.linear().domain([minValue, maxValue]).range([height,0]); //y scale
				
				var xAxis = d3.svg.axis().scale(x).orient('bottom').outerTickSize(0).tickFormat(d3.time.format("%B '%y")).ticks(10).innerTickSize(-height).outerTickSize(0);
				var yAxis = d3.svg.axis().scale(y).orient('left').outerTickSize(0).ticks(5).innerTickSize(-width).outerTickSize(0);
				
				if (this.props.range=="mo" || this.props.range=="3mo") { //if range is shorter, need to change tick format 
					xAxis.tickFormat(d3.time.format("%d %b")).ticks(5);
				}
				
				var line = d3.svg.line().x(function(d) { return x(formatDate.parse(d.date)); }).y(function(d) { return y(d.value); });
				
				svg.append('g').attr('class', 'axis xAxis').attr('transform', 'translate(0,' + parseInt(height) + ')').call(xAxis); //add the x axis
				svg.append('g').attr('class', 'axis yAxis').call(yAxis); //add the y axis
				
				arr.forEach(function(data) {
					svg.append('path').attr('class', 'line').attr('d', line(data)); //draw each stock line
					svg.append('g').attr('class', data[0].name + " popUp").append('text'); //create a overlay popup for each stock to be used for mouseover events
				});
				
				var marker = svg.append('line').attr('class','lineMarker'); //vertical marker
				
				var lastUpdate = 0;
				var timer;
				
				svg.append('rect').attr('class', 'overlay').attr('width',width).attr('height',height) //invisible overlay for getting coordinates
				.on('mouseover', function() {  marker.style('display','block'); })
				.on('mousemove', function() { drawVert(); }) 
				.on('mouseout', function() {  clearTimeout(timer); marker.style('display','none'); d3.selectAll('.popUp').select('text').text(''); });
				
				function drawVert() {
					clearTimeout(timer);
					var xPoint = d3.mouse(d3.select('.overlay').node())[0]; //get x coordinate of mouse
					marker.attr('x1', xPoint).attr('y1', 0).attr('x2', xPoint).attr('y2', height);
					
					if (Date.now() - lastUpdate>50) {
						arr.forEach(function(data) { //for each stock line
							data = data.map(function(d) {
								var obj = { date: formatDate.parse(d.date), value: d.value, name: d.name };
								return obj;
							});
							data = data.sort(function(a, b) {
								return a.date - b.date;
							});
							
							var theDate = x.invert(xPoint); //get corresponding date of mouse x coordinate 
							var index = bisectDate(data, theDate, 1); //grab data index of that date 
							if ((index+1)>=data.length) {
								index-=2;
							}
							var d = data[index]; //data point 
							var theClass = "." + d.name; 
							
							if (xPoint>(width-75)) { //change the text position if nearing end of graph 
								d3.select(theClass).attr('transform','translate(' + x(d.date) + ',' + (y(d.value)-10) + ')').select('text').text(d.name + " - [$" + d.value + "]")
								.attr('text-anchor','end');
							} 
							else {
								d3.select(theClass).attr('transform','translate(' + x(d.date) + ',' + (y(d.value)-10) + ')').select('text').text(d.name + " - [$" + d.value + "]")
								.attr('text-anchor','start'); 
							}
							
							
							lastUpdate = Date.now();
						});
					}
					
					timer = setTimeout(function() {
						arr.forEach(function(data) { //for each stock line
							data = data.map(function(d) {
								var obj = { date: formatDate.parse(d.date), value: d.value, name: d.name };
								return obj;
							});
							data = data.sort(function(a, b) {
								return a.date - b.date;
							});
							
							var theDate = x.invert(xPoint); //get corresponding date of mouse x coordinate 
							var index = bisectDate(data, theDate, 1); //grab data index of that date 
							if ((index+1)>=data.length) {
								index-=2;
							}
							
							var d = data[index]; //data point 
							var theClass = "." + d.name; 
							
							if (xPoint>(width-75)) { //change the text position if nearing end of graph 
								d3.select(theClass).attr('transform','translate(' + x(d.date) + ',' + (y(d.value)-10) + ')').select('text').text(d.name + " - [$" + d.value + "]")
								.attr('text-anchor','end');
							} 
							else {
								d3.select(theClass).attr('transform','translate(' + x(d.date) + ',' + (y(d.value)-10) + ')').select('text').text(d.name + " - [$" + d.value + "]")
								.attr('text-anchor','start'); 
							} 
							
							lastUpdate = Date.now();
						});
						
					},250);
				}
				
				
			
		}
		
	}
	
	render() {
		if (this.props.stockList.length<=0) {
			return (
				<div className="chartContainer">
					<h2>NO STOCKS SELECTED</h2>
				</div>
				);
		}
		else {
			return (<div className="chartContainer">
						<div id="rangeBar">
							<div className="rangeBtn" onClick={() => this.props.changeRange("mo")}>1M</div>
							<div className="rangeBtn" onClick={() => this.props.changeRange("3mo")}>3M</div>
							<div className="rangeBtn" onClick={() => this.props.changeRange("year")}>1Y</div>
							<div className="rangeBtn" onClick={() => this.props.changeRange("3year")}>3Y</div>
						</div>
						<span id="titleText">StockSeeker</span>
				   </div>);
		}
	}
}

class ToolBar extends React.Component {
	constructor(props) {
		super(props);
		this.getStockBoxes = this.getStockBoxes.bind(this);
	}
	
	getStockBoxes() {
		return this.props.stockList.map(function(item) {
			return <Box name={item.name} code={item.code} value={item.value} key={item.code} removeStock={this.props.removeStock} />;
		}.bind(this));
	}
	
	render() {
		var codeArr = this.props.stockList.map(function(stock) {
			return stock.code;
		});
		return <div className="toolBar">
			<form id="stockForm" onSubmit={(event) => { event.preventDefault(); var sym = $('#stockInput').val().toUpperCase(); if (codeArr.indexOf(sym)== -1) {this.props.submitStock(sym); } }}>
				<input id="stockInput" placeholder="Enter Stock Code" type='text'></input>
				<div id="listHolder">{this.getStockBoxes()}</div>
			</form>
		</div>;
	}
}

class Box extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
			return (
				<div className='listItem'>
					<span className='codeName'>{this.props.code + " - "}</span><span className='stockValue'>{"[$" + this.props.value + "]"}</span><br/>
					<span className='extName'>{this.props.name}</span><br/>
					<div onClick={() => this.props.removeStock(this.props.code)} className='removeItem'>x</div>
				</div>
				);
				
	}
}

function formatNum(num) { //helper function for padding numbers
	if (Math.floor(num/10) == 0) {
		return "0" + num.toString();
	}
	else {
		return num.toString();
	}
}


ReactDOM.render(<App/>, document.querySelector(".app"));



// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
