//imports
const date = require('date-and-time');
const yahooFinance = require('yahoo-finance2').default;

module.exports = {
    getTickerData:
        async function getTickerData(ticker) {

            let data_month_ago = 4;

            const now = new Date();
            let reqd_date = date.addMonths(now, -1 * data_month_ago);
            reqd_date = date.format(reqd_date, 'YYYY-MM-DD');

            const query = ticker;
            const queryOptions = { period1: reqd_date, interval: "1d" };
            const result = await yahooFinance.historical(query, queryOptions);
            
            var response = { ticker: ticker, data: result };
            return response;
        }
    ,

}