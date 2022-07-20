document.querySelector('button').addEventListener('click', conductSearch)

function conductSearch(){
let userQuery = document.querySelector('input').value
let ul = document.querySelector('.resultsUL')

document.querySelector('.results').classList.remove('hide')

//api request currently filters for keto friendly, soy free, gluten free, and vegan
fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${userQuery}&app_id=b76dc390&app_key=8cdd68de3e3deb4065a37433c066f003&health=keto-friendly&health=soy-free&health=gluten-free&health=vegan`)
.then(res => res.json())
.then(data => {
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    data.hits.forEach( (item) => {
        console.log(item)
        let li = document.createElement('li')
        document.querySelector('.resultsUL').appendChild(li)
        li.textContent = `${item.recipe.label} ${item.recipe.url}`
    })

    ul.scrollIntoView({behavior: 'smooth', block: "center"})
    
})
.catch((err) => {
    console.error(err)
})

}


