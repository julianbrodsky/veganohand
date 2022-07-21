//event listener to search button to search upon click
document.querySelector('.searchButton').addEventListener('click', conductSearch)

//tags!
let tags = '&health=vegan'
document.querySelector('.gluten').addEventListener('click', gluten)

function gluten(){
    if(tags.includes('&health=gluten-free')){
        tags.replace('&health=gluten-free', '') //this line isn't working!
        document.querySelector('.gluten').style.backgroundColor = '#87ba52'
        console.log('includes' + tags)
     }else{
        tags += '&health=gluten-free'
        document.querySelector('.gluten').style.backgroundColor = '#85a167'
        console.log('doesnt include' + tags)
     }
}





//searches for recipes
function conductSearch(){
let userQuery = document.querySelector('input').value
let ul = document.querySelector('.resultsUL')

//displays the results section at the bottom of the page
document.querySelector('.results').classList.remove('hide')

//api request for the search query and tags submitted
console.log(tags)
fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${userQuery}&app_id=b76dc390&app_key=8cdd68de3e3deb4065a37433c066f003${tags}`)
.then(res => res.json())
.then(data => {
    //removes all recipes already listed so users can do 
    //multiple searches in one session
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)

    }
    //loops through all recipes from the api's response, 
    //creates an lis to hold them, and puts the recipe name and url in the li
    data.hits.forEach( (item) => {
        console.log(item)
        let li = document.createElement('li')
        document.querySelector('.resultsUL').appendChild(li)
        li.textContent = `${item.recipe.label} ${item.recipe.url}`
    })
    //scrolls to the results section
    ul.scrollIntoView({behavior: 'smooth', block: "center"})
    
})
.catch((err) => {
    console.error(err)
})

}


