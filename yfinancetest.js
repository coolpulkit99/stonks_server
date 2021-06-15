var yahooFinance = require('yahoo-finance');

const date = require('date-and-time');

let data_month_ago = 4;

const now = new Date();
const reqd_date = date.addMonths(now, -1 * data_month_ago);
var xxy = date.format(reqd_date, 'YYYY-MM-DD');

console.log(reqd_date)
console.log(xxy);

// yahooFinance.historical({
//     symbols: ["AAPL", "TSLA"],
//     from: "Fri Apr 12 1996 00:00:00 GMT-0400 (EDT)",
//     // to: Date.now()
//   }, function (err, result) {
//     console.log(result)
//   });