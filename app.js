
const getFoodName = foodName =>{

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
    .then( res =>res.json())
    .then(data =>showMealGrid(data.meals) )
}



const searchBtn = document.getElementById('search_btn');
searchBtn.addEventListener('click',()=>{
    const mealNameInput = document.getElementById('meal_name_input').value;
    getFoodName(mealNameInput)
})

const showMealGrid = mealInput =>{
let parentDiv = document.getElementById('mealsContainer');

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

    // parentDiv.innerHTML += childMealDiv;
});
// for (let i = 0; i < mealInput.length; i++) {
//     const mealsDataFull = mealInput[i];

//     const childMealDiv = `
//         <div>
//             <img src = ${mealsDataFull.strMealThumb}>
//             <h3>${mealsDataFull.strMeal}</h3>
//         </div>
//     `;  
//     console.log(childMealDiv)
// }
}
const singleMealId = singleMealId =>{
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleMealId}`
fetch(url)
.then(res => res.json())
.then(data => singleMealFullInfo(data.meals[0]))
}


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

        // if(meal[ingredientList] != ""){
        //     const li = document.createElement("li");
        //     li.innerText = meal[ingredientList];
        //     li.className = "ingredient-list";
        //     ingredientListUl.appendChild(li);
        // }
        if (meal[ingredientList] != "" && meal[ingredientList] != undefined ) {
            const li = document.createElement("li");
            li.innerText = meal[ingredientList]; 
            li.className = "ingredient-list";
            ingredientListUl.appendChild(li);
        }
       
        
    }


    console.log(singleHeadline,singleImage)
}




getFoodName()