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

    // NOT WORKING ----------------------------------------------------------
    var testobject = [{recipe_label: "HI"}, {recipe_label: "BYE"}];
    var source = $("#test").html();
    var template = Handlebars.compile(source);
    $("body").append( template({recipeList: testobject}) );
    // ^ WE PROBABLY NEED TO DO A CALLBACK .......maybe
    values = [];
    //clear form
    $("input[type='checkbox']").prop("checked", false);
});

// function clearForm() {
//     $('input[name="Int7"]').val('');
// };

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

            // servings
            singleRecipe["servings"] = array[i].recipe.yield;

            // calories
            var calories = Math.round(array[i].recipe.calories);
            singleRecipe["calories"] = calories;

            // cautions
            var cautions = array[i].recipe.cautions;
            singleRecipe["cautions"] = cautions;

            // diet labels
            var dietLabels = array[i].recipe.dietLabels;
            singleRecipe["diet_labels"] = dietLabels;

            // health labels
            var healthLabels = array[i].recipe.healthLabels;
            singleRecipe["health_labels"] = healthLabels;

            // recipe image
            var recipeImg = array[i].recipe.image;
            singleRecipe["img"] = recipeImg;

            // recipe source. link to get cooking instructions
            var recipeURL = array[i].recipe.url;
            singleRecipe["url"] = recipeURL;

            // ingredient lines
            var ingredients = array[i].recipe.ingredientLines;
            singleRecipe["ingredients"] = ingredients;

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

            console.log(singleRecipe);
            recipeList.push(singleRecipe);
        };
        console.log(recipeList);
        return recipeList;
        // $("#api").append(singleRecipe);

    });
};