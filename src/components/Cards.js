import React from "react";

const Cards = () => {
    return (
    <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
    <h1 className="display-3 align-center">
        <img alt="user-image" src="https://placehold.it/80x80" /> Hello, Monster!
        </h1>
    <br />
    <br />
    <div className="card-columns">
  
        <div className="card text-center">
            <div className="card-body">
                <h4 className="card-title">Your Wallet</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">$</th>
                            <th scope="col">+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>$1000.00</td>
                            <td>$0.35</td>
                        </tr>
                    </tbody>
                </table>
                <p className="card-text"><small className="text-muted">Last updated 3 mins
                ago</small></p>
            </div>
        </div>
        
        <div className="card text-center">
            <div className="card-body">
                <h4 className="card-title">Monster League</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>@Maike</td>
                            <td>$3,000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>@Nick</td>
                            <td>$2700</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>@Nathan</td>
                            <td>$2000</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>@Kristine</td>
                            <td>$1200</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>@Chris</td>
                            <td>$2</td>
                        </tr>
                    </tbody>
                </table>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        

        <div className="card text-center p-3">
            <h4 className="card-title">Fact Of The Day</h4>
            <hr />
            <blockquote className="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat.</p>
                <footer className="blockquote-footer">
                    <small>Warren Buffett <cite title="Source Title">Forbes
                    2012</cite></small>
                </footer>
            </blockquote>
        </div>
        
        <div className="card bg-primary text-white text-center p-3">
            <h4 className="card-title">Quote Of The Day</h4>
            <hr />
            <blockquote className="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer className="blockquote-footer">
                    <small>Warren Buffett <cite title="Source Title">2012</cite></small>
                </footer>
            </blockquote>
        </div>

        <div className="card text-center">
            <img alt="Card image cap" className="card-img-top" src=
            "https://placehold.it/200x100" />
            <div className="card-body">
                <h4 className="card-title">Your Stocks</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">AAPL</th>
                            <td>$175.86</td>
                            <td>+3%</td>
                        </tr>
                        <tr>
                            <th scope="row">TSLA</th>
                            <td>$307.43</td>
                            <td>-2%</td>
                        </tr>
                        <tr>
                            <th scope="row">VFC</th>
                            <td>$69.36</td>
                            <td>+7%</td>
                        </tr>
                        <tr>
                            <th scope="row">NKE</th>
                            <td>$56.09</td>
                            <td>+2%</td>
                        </tr>
                        <tr>
                            <th scope="row">GPRO</th>
                            <td>$8.06</td>
                            <td>-2%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="card text-center">
            <div className="card-body">
                <h4 className="card-title">Transaction History</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Stock</th>
                            <th scope="col">Shares</th>
                            <th scope="col">Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">AAPL</th>
                            <td>10</td>
                            <td>$171.98</td>
                        </tr>
                        <tr>
                            <th scope="row">TSLA</th>
                            <td>6</td>
                            <td>$307.43</td>
                        </tr>
                        <tr>
                            <th scope="row">VFC</th>
                            <td>2</td>
                            <td>$55.00</td>
                        </tr>
                    </tbody>
                </table>
                <p className="card-text"><small className="text-muted">Last updated 3 mins
                ago</small></p>
            </div>
        </div>
        
        <div className="card text-center">
            <img alt="Card image cap" className="card-img-top" src="https://placehold.it/200x100" />
            <div className="card-body">
                <h4 className="card-title">Following</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Avatar</th>
                            <th scope="col">Username</th>
                            <th scope="col">Wallet</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><img alt="avatar" src=
                            "https://placehold.it/45x45" /></th>
                            <td>@BumbleBeeTuna</td>
                            <td>$7394.21</td>
                        </tr>
                        <tr>
                            <th scope="row"><img alt="avatar" src=
                            "https://placehold.it/45x45" /></th>
                            <td>@OhWeeMohWeh</td>
                            <td>$3007.43</td>
                        </tr>
                        <tr>
                            <th scope="row"><img alt="avatar" src=
                            "https://placehold.it/45x45" /></th>
                            <td>@AceVPD</td>
                            <td>$5523.00</td>
                        </tr>
                        <tr>
                            <th scope="row"><img alt="avatar" src=
                            "https://placehold.it/45x45" /></th>
                            <td>@AllRightyThen</td>
                            <td>$7233.00</td>
                        </tr>
                        <tr>
                            <th scope="row"><img alt="avatar" src=
                            "https://placehold.it/45x45" /></th>
                            <td>@MonopolyMan</td>
                            <td>$9274.00</td>
                        </tr>
                    </tbody>
                </table>
                <p className="card-text"><small className="text-muted">Last updated 3 mins
                ago</small></p>
            </div>
        </div>
    </div>
</main>
)
};

export default Cards;