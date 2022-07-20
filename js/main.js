document.querySelector('button').addEventListener('click', conductSearch)

function conductSearch(){
let userQuery = document.querySelector('input').value

document.querySelector('.results').classList.remove('hide')

fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${userQuery}&app_id=b76dc390&app_key=8cdd68de3e3deb4065a37433c066f003&diet=low-carb&health=vegan`)
.then(res => res.json())
.then(data => {
    console.log(data)
    data.hits.forEach( (item) => {
        console.log(item)
        let li = document.createElement('li')
        document.querySelector('.resultsUL').appendChild(li)
        li.textContent = item.recipe.url
    })
    
})

}


