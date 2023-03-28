let result = document.getElementById('result');
let searchBtn =  document.getElementById('searchBtn');
let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';


searchBtn.addEventListener('click', () => {
    let userInput = document.getElementById('userInput').value;

    if(userInput.length === 0) {

        result.innerHTML = `
            <h3>Input field cannot be Empty</h3>
        `
    }else {

        fetch(url + userInput)
    .then((resp) => resp.json())
    .then((data) => {
    let myMeal = data.meals[0]

    let count = 1;
    let ingredients = [];

    for(let i in myMeal) {
        let ingredient = '';
        let measure = '';

        if(i.startsWith('strIngredient') && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count]
            count +=1;

            ingredients.push(`${measure} ${ingredient}`)
        }
    }

    result.innerHTML = `
        <img src='${myMeal.strMealThumb}' alt='meal image.jpeg'>

        <p class='mealTitle'>${myMeal.strMeal}</p>
        <p class='mealSubTitle'>${myMeal.strArea}, ${myMeal.strCategory}</p>
        
        <div id='ingredientCon'></div>
        <div id='recipe'>
            <button id='hideRecipe'>x</button>
            <pre id='instructions'>${myMeal.strInstructions}</pre> 
        </div>
        <button id='showRecipe'>View Recipe</button>
    `

    document.getElementById('hideRecipe').addEventListener('click', () => {
        
        document.getElementById('recipe').style.display = 'none';
    })

    document.getElementById('showRecipe').addEventListener('click', () => {
    
        document.getElementById('recipe').style.display = 'block';
    })

    let ingredientCon = document.getElementById('ingredientCon');
    let parent = document.createElement('ul');
    let heading = document.createElement('h2')

    ingredients.forEach((i) => {
        let child = document.createElement('li')
        child.innerHTML = i;
        parent.appendChild(child);
        heading.innerText = `Ingredients`
        ingredientCon.appendChild(heading)
        ingredientCon.appendChild(parent)
    })
    
    }).catch(() => {
        result.innerHTML = `
            <h3>Error fetching Data</h3>
        `
    })

    }

})




