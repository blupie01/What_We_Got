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

	var singleRecipe = $("<div>");

	for (var i = 0; i < array.length; i++) {
		// recipe name
		var recipeDiv = $("<h2>Recipe: " + array[i].recipe.label + "</h2>");
		singleRecipe.append(recipeDiv);

		// servings
		var servingsDiv = $("<div id='servings'><h3>Servings: " + array[i].recipe.yield + "</h3></div>");
		singleRecipe.append(servingsDiv);

		// calories
		var calories = array[i].recipe.calories;
		var caloriesDiv = $("<div id='calories'>");
		caloriesDiv.append("Calories: " + calories);
		singleRecipe.append(caloriesDiv);

		// cautions
		var cautions = array[i].recipe.cautions;
		// cautions.push("test");
		// cautions.push("test2");
		if (cautions.length == 0) {
			singleRecipe.append("<div id='cautions'><h3>No Cautions</h3></div>");
		} else {
			var cautionsDiv = $("<div id='cautions'>");
			var cautionsList = $("<ul id='caution_list'>Cautions:</ul>");
			for (var c = 0; c < cautions.length; c++) {
				cautionsList.append("<li>" + cautions[c] + "</li>");
			};
			cautionsDiv.append(cautionsList);
			singleRecipe.append(cautionsDiv);
		};

		// diet labels
		var dietLabels = array[i].recipe.dietLabels;
		var dietLabelsDiv = $("<div id='diet_labels'>");
		var dietLabelsList = $("<ul id='diet_labels_list'><h3>Diet Labels</h3></ul>");
		for (var label = 0; label < dietLabels.length; label++) {
			dietLabelsList.append("<li>" + dietLabels[label] + "</li>");
		};
		dietLabelsDiv.append(dietLabelsList);
		singleRecipe.append(dietLabelsDiv);

		// digest
		// wtf am i looking at

		// health labels NOT DONE PROPERLY
		var healthLabels = array[i].recipe.healthLabels;
		var healthLabelsDiv = $("<div id='health_labels'>");
		var healthLabelsList = $("<ul id='health_labels_list'><h3>Health Labels</h2></ul>");
		for (var hLabels = 0; hLabels < healthLabels.length; hLabels++) {
			healthLabelsList.append("<li>" + healthLabels[hLabels] + "</li>");
		};
		healthLabelsDiv.append(healthLabelsList);
		singleRecipe.append(healthLabelsDiv);

		// recipe image
		var recipeImg = array[i].recipe.image;
		singleRecipe.append("<br><img src=" + recipeImg + ">");

		// ingredient lines
		var ingredients = array[i].recipe.ingredientLines;
		var ingredientsDiv = $("<div id='ingredients'>");
		var ingredientsList = $("<ul id='ingredients_list'>Ingredients:</ul>");
		for (var ingredient = 0; ingredient < ingredients.length; ingredient++) {
			ingredientsList.append("<li>" + ingredients[ingredient] + "</li>");
		};
		ingredientsDiv.append(ingredientsList);
		singleRecipe.append(ingredientsDiv);

		// ingredients
		// don't think this will be useful
		// gives ingredients again and also a key for weight this amount of ingredient will have

		// recipe source. link to get cooking instructions
		var recipeURL = array[i].recipe.url;
		var link = $("<a href=" + recipeURL + ">Cooking Instructions @ " + array[i].recipe.source + "</a>");
		singleRecipe.append(link);

		singleRecipe.append($("<p>=======================================================================</p>"));
	};

	$("#api").append(singleRecipe);
});