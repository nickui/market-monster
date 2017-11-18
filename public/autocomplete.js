// Using JQueryUI to Autocomplete Stock Ticker/Stock Name through Yahoo Finance API
$("#stock").autocomplete({
  source: function (request, response) {
    var YAHOO = window.YAHOO = {Finance: {SymbolSuggest: {}}};
    YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {
      var mapped = $.map(data.ResultSet.Result, function (stock, callback) {
        return {
          label: stock.symbol + ' (' + stock.name + ')',
          value: stock.symbol
        };
      });
      response(mapped);
    };
    // Yahoo Autocomplete Query URL
    var url = [
        "https://s.yimg.com/aq/autoc?query="
        + request.term +
        "&region=CA&lang=en-CA&callback=YAHOO.Finance.SymbolSuggest.ssCallback"];
    $.getScript(url.join(""));
  },
  minLength: 2
});
