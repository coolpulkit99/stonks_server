var app = require('express')();
var utility = require("./utility");
var calculations = require("./calculations");
var stockdata = require("./stockdata");
const yfinancetest = require('./yfinancetest');

require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("up");    
})

app.get("/nifty/:count", (req, res) => {

    let count = req.params.count;
    let response = { tickers: utility.getTickers(count) }
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
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



app.get("/filter/:count", (req, res) => {
    var tickers = utility.getTickers(req.params.count);
    var filteredTickers = new Array();
    const callbackFunc = (results) => {
        for (const stock_ticker of tickers) {
            let newobj = {}
            let satisfiesFilter = calculations.satisfyFilter(results[stock_ticker].reverse());
            if (satisfiesFilter) {
                filteredTickers.push(stock_ticker);
            }
        }
        var response = { tickers: filteredTickers };
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.send(response);
    }
    var results = yfinancetest.getTickerData(tickers, callbackFunc);

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

app.get("/tickerold/:ticker", (req, res) => {

    yfinancetest.getTickerData([req.params.ticker],
        (data) => {
            var response = {
                quotes: data[req.params.ticker].reverse()
            }

            res.set({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.send(response);
        })

})

app.get("/satisfyfilter/:ticker", (req, res) => {
    stockdata.getTickerData(req.params.ticker)
        .then(data => {

            var response = {
                boolean: calculations.satisfyFilter(data.data)
            }

            res.set({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.send(response);
        });
})


app.listen(process.env.PORT || 8087);