var options = {
	url: "assets/data/symbols.json",
  getValue: "symbol",
  list: {
		match: {
			enabled: true
		}
	},
	template: {
		type: "description",
		fields: {
			description: "name"
		}
	}
};

$("#ticker").easyAutocomplete(options);