var app = require('express')();
var utility = require("./utility");
var calculations = require("./calculations");
var stockdata = require("./stockdata");

// var cors=require('cors');

// app.use(cors());

app.get("/nifty/:count", (req, res) => {

    let count = req.params.count;
    // console.log(count);
    let response = { tickers: utility.getTickers(count) }
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    // console.log(response)
    res.send(response);

})

app.get("/filtered", (req, res) => {
    var tickers = utility.getTickers(100);
    var filteredTickers = new Array();
    var promises = []
    tickers.forEach(ticker => {
        data = stockdata.getTickerData(ticker);
        promises.push(data);

    });
    Promise.all(promises).then(values => {
        for (const stock_data of values) {
            let satisfiesFilter = calculations.satisfyFilter(stock_data.data);
            if (satisfiesFilter) {
                filteredTickers.push(stock_data.ticker);
            }
        }
        var response = { tickers: filteredTickers };
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.send(response);
    })

})

app.get("/ticker/:ticker", (req, res) => {

    stockdata.getTickerData(req.params.ticker)
        .then(data => {
            var response = {
                quotes: data
            }

            res.set({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.send(response);
        });

})


app.listen(8087);