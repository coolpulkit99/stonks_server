const SMA = require('technicalindicators').SMA;

var functions = {
    calculateMovingAverage:
        function calculateMovingAverage(period, prices) {
            var r = SMA.calculate({ period: period, values: prices })
            return r;
        }

    ,

    satisfyFilter:
        function satisfyFilter(stock_data) {
            var close_prices = []
            var open_prices = []

            for (const quote of stock_data) {
                close_prices.push(quote.close);
                open_prices.push(quote.open);
            }

            var moving_avarage_price = functions.calculateMovingAverage(44, close_prices);
            var length_MA = moving_avarage_price.length;

            let no_days_ago = 10;
            let percent_offset = 0.05;

            var slope_condition = moving_avarage_price[length_MA - 1] > moving_avarage_price[length_MA - 1 - no_days_ago];
            var last_candle_condition =
                open_prices[open_prices.length - 1] < (1 + percent_offset) * moving_avarage_price[length_MA - 1]
                && moving_avarage_price[length_MA - 1] * (1 - percent_offset) <= open_prices[open_prices.length - 1];

            if (slope_condition && last_candle_condition) {
                return true;
            } else {
                return false;
            }
        }
}

module.exports = functions;