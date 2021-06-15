
var xlsx = require('node-xlsx');

module.exports = {
    getTickers:
        function getTickers(type) {
            if (type == "test") {
                return ["AAPL", "TSLA", "SYNGENE.NS", "HCC.NS", "GLAXO.NS"]
            }
            if (type == "50") {
                let obj = xlsx.parse(__dirname + '/data/NIFTY50.csv')[0]["data"]
                let tickers = []
                for (var i = 1; i < obj.length; i++) {
                    tickers.push(obj[i][0] + ".NS");
                }
                return tickers;
            }
            if (type == "100") {
                let obj = xlsx.parse(__dirname + '/data/CN100.csv')[0]["data"]
                let tickers = []
                for (var i = 1; i < obj.length; i++) {
                    tickers.push(obj[i][0] + ".NS");
                }
                return tickers;
            }
            if (type == "200") {
                let obj = xlsx.parse(__dirname + '/data/CN200.csv')[0]["data"]
                let tickers = []
                for (var i = 1; i < obj.length; i++) {
                    tickers.push(obj[i][0] + ".NS");
                }
                return tickers;
            }
            if (type == "500") {
                let obj = xlsx.parse(__dirname + '/data/CN500.csv')[0]["data"]
                let tickers = []
                for (var i = 1; i < obj.length; i++) {
                    tickers.push(obj[i][0] + ".NS");
                }
                return tickers;
            }
        }
    ,




}
