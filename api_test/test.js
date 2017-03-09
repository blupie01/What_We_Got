// a99c054e

// a6913d9b394ea2d13dbfe40ee6ef0621

var searchTest = "chicken+carrots+peppers";

var queryURL = "https://api.edamam.com/search?q=" + searchTest + "&app_id=a99c054e&app_key=a6913d9b394ea2d13dbfe40ee6ef0621&from=0&to=10";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(object) {
	console.log(object.hits);

	var array = object.hits;

	var single_recipe = $("<div>");

	for (var i = 0; i < array.length; i++) {
		// calories
		var calories = array.recipe.calories;

		// diet labels
		var dietLabels = array.recipe.cautions;
		for (var labels = 0; labels < dietLabels.length; i++) {
			
		}
	};
});