//fetching all meals data matched with search value
const getFoodName = foodName =>{

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
    .then( res =>res.json())
    .then(data =>showMealGrid(data.meals) )
    .catch(error =>{
        if(error){
            document.getElementById('mealsContainer').innerText = 'there is no recipe matched with your search term'
        }
    })
}

//getting input value from search box 
const inputValueGet = () =>{
   
        
        const mealNameInput = document.getElementById('meal_name_input').value;
        if(mealNameInput == '' || mealNameInput == undefined){
            alert('please input a character into search feild')
        }
        else{
            getFoodName(mealNameInput)
        }
       
   
}



// showing meal items in a grid 
const showMealGrid = mealInput =>{
let parentDiv = document.getElementById('mealsContainer');
if(mealInput == '' || mealInput == undefined){
    document.getElementById('mealsContainer').innerText = 'there is no recipe matched with your search item'
}
else{
    mealInput.forEach(singleMeal => {
        const anotherDiv = document.createElement('div')
        const childMealDiv = `
        <div class='single_meal_box' onclick="singleMealId('${singleMeal.idMeal}')">
            <img src ="${singleMeal.strMealThumb}">
            <h3>${singleMeal.strMeal}</h3>
        </div>
        `;
        anotherDiv.innerHTML= childMealDiv
        parentDiv.appendChild(anotherDiv)
    
    
    });
}


// fetching single Meal after click on any meal from all meal items
}
const singleMealId = singleMealId =>{
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleMealId}`
fetch(url)
.then(res => res.json())
.then(data => singleMealFullInfo(data.meals[0]))
}

//showing the information of the clicked meal

const singleMealFullInfo = meal =>{
    const singleHeadline = meal.strMeal;
    document.getElementById('meal_headline').innerText =`${singleHeadline} 
    Ingredients` ;
    // const singleImage = meal.strMealThumb;
    const singleImage = document.getElementById('single_img');
    singleImage.style.display ='block'
    singleImage.setAttribute('src',meal.strMealThumb);
    //ul element for the ingredient list
    const ingredientListUl= document.getElementById('ingredient_list');
    ingredientListUl.style.display = 'block'

    for (let i = 0; i < 20; i++) {
        const ingredientList = `strIngredient${i}`;

        if (meal[ingredientList] != "" && meal[ingredientList] != undefined ) {
            const li = document.createElement("li");
            li.innerText = meal[ingredientList]; 
            li.className = "ingredient-list";
            ingredientListUl.appendChild(li);
        }
       
        
    }


    console.log(singleHeadline,singleImage)
}


// getFoodName()
