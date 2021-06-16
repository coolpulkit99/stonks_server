var yahooFinance = require('yahoo-finance');
const date = require('date-and-time');

let data_month_ago = 4;

const now = new Date();
const reqd_date = date.addMonths(now, -1 * data_month_ago);
var formatted = date.format(reqd_date, 'YYYY-MM-DD');

module.exports = {
    getTickerData: (tickers, callback) => {
        yahooFinance.historical({
            symbols: tickers,
            from: formatted
        }, function (err, result) {
            if (!err) {
                callback(result);
            }
            else
                console.error(err);
        });
    }
}