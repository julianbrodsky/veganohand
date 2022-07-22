//tags!
let tags = '&health=vegan'

class MakeTags{
    constructor(selector, link){
        this._selector = selector
        this._link = link
    }
    get selector(){
        return(this._selector)
    }
    get link(){
        return(this._link)
    }
    clickTag(){
        if(tags.includes(this.link)){
            tags = tags.replace(this.link, '')
            document.querySelector(this.selector).style.backgroundColor = '#87ba52'
         }else{
            tags += this.link
            document.querySelector(this.selector).style.backgroundColor = '#85a167'
         }
    }
}

const gluten = new MakeTags('.gluten', '&health=gluten-free')
document.querySelector(gluten.selector).addEventListener('click', function(){gluten.clickTag()})

const keto = new MakeTags('.keto', '&health=keto-friendly')
document.querySelector(keto.selector).addEventListener('click', function(){keto.clickTag()})

const paleo = new MakeTags('.paleo', '&health=paleo')
document.querySelector(paleo.selector).addEventListener('click', function(){paleo.clickTag()})

const peanut = new MakeTags('.peanut', '&health=peanut-free')
document.querySelector(peanut.selector).addEventListener('click', function(){peanut.clickTag()})

const treenut = new MakeTags('.treenut', '&health=tree-nut-free')
document.querySelector(treenut.selector).addEventListener('click', function(){treenut.clickTag()})

const soy = new MakeTags('.soy', '&health=soy-free')
document.querySelector(soy.selector).addEventListener('click', function(){soy.clickTag()})

const kidney = new MakeTags('.kidney', '&health=kidney-friendly')
document.querySelector(kidney.selector).addEventListener('click', function(){kidney.clickTag()})

const carb = new MakeTags('.carb', '&diet=low-carb')
document.querySelector(carb.selector).addEventListener('click', function(){carb.clickTag()})


//event listener to search button to search upon click
document.querySelector('.searchButton').addEventListener('click', conductSearch)

// function gluten(){
//     if(tags.includes('&health=gluten-free')){
//         tags = tags.replace('&health=gluten-free', '')
//         document.querySelector('.gluten').style.backgroundColor = '#87ba52'
//      }else{
//         tags += '&health=gluten-free'
//         document.querySelector('.gluten').style.backgroundColor = '#85a167'
//      }
// }

//tags constructor



//searches for recipes
function conductSearch(){
let userQuery = document.querySelector('input').value
let ul = document.querySelector('.resultsUL')

//displays the results section at the bottom of the page
document.querySelector('.results').classList.remove('hide')
document.querySelector('.whiteBar').classList.remove('hide')


//api request for the search query and tags submitted
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
        let li = document.createElement('li')
        document.querySelector('.resultsUL').appendChild(li)
        li.textContent = `${item.recipe.label}: ${item.recipe.url}`
    })
    //scrolls to the results section
    ul.scrollIntoView({behavior: 'smooth', block: "center"})
    
})
.catch((err) => {
    console.error(err)
})

}