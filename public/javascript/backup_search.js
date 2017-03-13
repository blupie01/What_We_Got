jQuery(function(){
    var max = 1;
    var checkboxes = $('input[name="Int1"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 2;
    var checkboxes = $('input[name="Int2"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 6;
    var checkboxes = $('input[name="Int3"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 1;
    var checkboxes = $('input[name="Int4"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 8;
    var checkboxes = $('input[name="Int5"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 1;
    var checkboxes = $('input[name="Int6"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});
jQuery(function(){
    var max = 4;
    var checkboxes = $('input[name="Int7"]');
                       
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});

//grabs values of selected checkboxes and pushes them to an array
var values = [];
$("#submit").on("click", function(event) {
    event.preventDefault();
    for (var i = 1; i <= 7; i++) {
        var checkboxes = document.querySelectorAll('input[name=Int' + i + ']:checked');
        Array.prototype.forEach.call(checkboxes, function(el) {
            values.push(el.value);
        });
    };
    var searchTerms = values.join("+");
    var queryString = "http://api.edamam.com/search?q=" + searchTerms + "&app_id=a99c054e&app_key=a6913d9b394ea2d13dbfe40ee6ef0621&from=0&to=10";
    getRecipes(values, queryString);
});

function getRecipes(values, queryString){
    $.ajax({
        url: queryString,
        method: "GET"
    }).done(function(object) {
        var array = object.hits;
        var recipeList = [];

        for (var i = 0; i < array.length; i++) {
            var singleRecipe = {};
            // recipe name
            singleRecipe["recipe_label"] = array[i].recipe.label;
            // var recipeDiv = $("<h2>Recipe: " + array[i].recipe.label + "</h2>");
            // singleRecipe.append(recipeDiv);
            // servings
            singleRecipe["servings"] = array[i].recipe.yield;
            // var servingsDiv = $("<div id='servings'><h3>Servings: " + array[i].recipe.yield + "</h3></div>");
            // singleRecipe.append(servingsDiv);
            // calories
            var calories = Math.round(array[i].recipe.calories);
            singleRecipe["calories"] = calories;
            // var caloriesDiv = $("<div id='calories'>");
            // caloriesDiv.append("Calories: " + calories);
            // singleRecipe.append(caloriesDiv);
            // cautions
            var cautions = array[i].recipe.cautions;
            singleRecipe["cautions"] = cautions;

            // if (cautions.length == 0) {
            //     singleRecipe.append("<div id='cautions'><h3>No Cautions</h3></div>");
            // } else {
                // var cautionsDiv = $("<div id='cautions'>");
                // var cautionsList = $("<ul id='caution_list'>Cautions:</ul>");
                // for (var c = 0; c < cautions.length; c++) {
                    // cautionsList.append("<li>" + cautions[c] + "</li>");
                // };
                // cautionsDiv.append(cautionsList);
                // singleRecipe.append(cautionsDiv);
            // };
            // diet labels
            var dietLabels = array[i].recipe.dietLabels;
            singleRecipe["diet_labels"] = dietLabels;
            // var dietLabelsDiv = $("<div id='diet_labels'>");
            // var dietLabelsList = $("<ul id='diet_labels_list'><h3>Diet Labels</h3></ul>");
            // for (var label = 0; label < dietLabels.length; label++) {
            //     dietLabelsList.append("<li>" + dietLabels[label] + "</li>");
            // };
            // dietLabelsDiv.append(dietLabelsList);
            // singleRecipe.append(dietLabelsDiv);
            // digest
            // wtf am i looking at
            // health labels NOT DONE PROPERLY
            var healthLabels = array[i].recipe.healthLabels;
            singleRecipe["health_labels"] = healthLabels;
            // var healthLabelsDiv = $("<div id='health_labels'>");
            // var healthLabelsList = $("<ul id='health_labels_list'><h3>Health Labels</h3></ul>");
            // for (var hLabels = 0; hLabels < healthLabels.length; hLabels++) {
            //     healthLabelsList.append("<li>" + healthLabels[hLabels] + "</li>");
            // };
            // healthLabelsDiv.append(healthLabelsList);
            // singleRecipe.append(healthLabelsDiv);
            // recipe image
            var recipeImg = array[i].recipe.image;
            singleRecipe["img"] = recipeImg;
            // singleRecipe.append("<br><img src=" + recipeImg + ">");
            // recipe source. link to get cooking instructions
            var recipeURL = array[i].recipe.url;
            singleRecipe["url"] = recipeURL;
            // var link = $("<a href=" + recipeURL + ">Cooking Instructions @ " + array[i].recipe.source + "</a>");
            // singleRecipe.append(link);
            // singleRecipe.append($("<p>=======================================================================</p>"));
            // ingredient lines
            var ingredients = array[i].recipe.ingredientLines;
            singleRecipe["ingredients"] = ingredients;
            // console.log("ALL INGREDIENTS");
            // console.log(ingredients);
            // var ingredientsDiv = $("<div id='ingredients'>");
            // var ingredientsList = $("<ul id='ingredients_list'><h3>Ingredients</h3></ul>");
            // for (var ingredient = 0; ingredient < ingredients.length; ingredient++) {
            //     ingredientsList.append("<li>" + ingredients[ingredient] + "</li>");
            // };
            // ingredientsDiv.append(ingredientsList);
            // singleRecipe.append(ingredientsDiv);

            // SORTING INGREDIENTS INTO HAVE AND NEED--------------------------------------------------------------------------
            var shoppingList = ingredients.slice(0, ingredients.length);

            for (var x = 0; x < shoppingList.length; x++) {
                for (var j = 0; j < values.length; j++) {
                    if (shoppingList[x].indexOf(values[j] ) > -1)  {

                        shoppingList.splice(shoppingList.indexOf(shoppingList[x]), 1);
                    };
                };
            };
            // console.log("SHOPPING LIST");
            // console.log(shoppingList);
            singleRecipe["shopping_list"] = shoppingList;

            //NEED FOR LOOP HERE TO DISPLAY SHOPPING LIST ON SCREEN
            // var shopListDiv = $("<div id='shopping_list_div'>");
            // var shopListWithHeader = $("<ul id='shopping_list'><h3>Shopping List</h3></ul>");
            // for (var t = 0; t < shoppingList.length; t++) {
            //     shopListWithHeader.append("<li>" + shoppingList[t] + "</li>");
            // };
            // shopListDiv.append(shopListWithHeader);
            // singleRecipe.append(shopListDiv);
            // singleRecipe.append($("<p>=======================================================================</p>"));
            console.log(singleRecipe);
            recipeList.push(singleRecipe);
        };
        console.log(recipeList);
        // return recipeList;
        // $("#api").append(singleRecipe);
    });
};