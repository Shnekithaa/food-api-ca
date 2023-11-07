let randomImgEl = document.getElementById("randomImg");
let randomCategoryEl = document.getElementById("randomCategory");
let randomDishNameEl = document.getElementById("randomDishName");
let ingredientsContainerEl = document.getElementById("ingredientsContainer");
let searchCategoryEl = document.getElementById("searchCategory");
let searchInputEl = document.getElementById("searchInput");
let searchedFoodsEl = document.getElementById("searchedFoods");
let footerListEl = document.getElementById("footerList");

let options = {
    method: "GET"
}
fetch("https://www.themealdb.com/api/json/v1/1/random.php", options)
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    console.log(jsonData);
    let randomImg = document.createElement('img');
    randomImg.src = jsonData.meals[0].strMealThumb;
    randomImg.classList.add("random-img-style")
    randomImgEl.appendChild(randomImg);
    randomCategoryEl.textContent = jsonData.meals[0].strCategory;
    randomDishNameEl.textContent = jsonData.meals[0].strMeal;
    showIngredients(jsonData);
});

function showIngredients(jsonData){
    for(let i = 1; i < 20; i++){
        let value = "strIngredient" + i
        let measure = "strMeasure" + i
        if(jsonData.meals[0][value] === ""){
            continue
        }else{
            ingredientsContainerEl.innerHTML += `<p>${jsonData.meals[0][value]} - ${jsonData.meals[0][measure]}</p>`;
        }
        
    }
}

function createAndAppendFood(eachFood){
    let div = document.createElement('div');
    searchedFoodsEl.appendChild(div);

    let foodImg = document.createElement('img');
    foodImg.src = eachFood.strMealThumb;
    foodImg.classList.add("food-img-box")
    div.appendChild(foodImg);

    let foodName = document.createElement('p');
    foodName.textContent = eachFood.strMeal;
    div.appendChild(foodName);
    
}

function fetchFoodData(){
    let options = {
        method: "GET"
    }
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+searchInputEl.value, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData);
        searchCategoryEl.textContent = searchInputEl.value;
        footerListEl.classList.remove("d-none");
        for(let eachFood of jsonData.meals){
            createAndAppendFood(eachFood);
        }  

    });
}

function searchFoods(event){
    if(searchInputEl.value !== "" && event.key === "Enter"){
        fetchFoodData();
    }
}

searchInputEl.addEventListener('keydown', searchFoods);