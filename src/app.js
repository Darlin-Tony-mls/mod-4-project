import { getArtworks, getArtworksBySearch, getArtworksById } from "./fetch.js";

import { getFavorites, addFavorites, removeFavorites } from "./favorites.js";

const renderArtworks = (arr) => {
    const ul = document.querySelector('#artwork-list')
     ul.innerHTML = ''
    arr.forEach((artwork) => {
        const li = document.createElement('li')
        li.textContent = artwork.title
        li.dataset.id = artwork.id
        li.innerHTML = `
        <p>${artwork.title}</p>
        ${artwork.image_id? ` <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg" alt="${artwork.title}">` : ''}
        `
        ul.append(li)
    })
}

  const renderFavorites = async () => {
        const favorites = getFavorites()
        const ul = document.querySelector('#favorites-list')
        ul.innerHTML = ''

        if (favorites.length === 0) {
            ul.innerHTML = '<li>no favorites yet</li>'
            return
        }

        for (const id of favorites)  {
            const {data, error} = await getArtworksById(id)
            if (error) continue


            const li = document.createElement('li')
            li.textContent = data.title
            li.dataset.id = data.id
            ul.append(li)
        }

    }

const renderSingleArt = (data) => {
    const section = document.querySelector('#artwork-detail')
    const favorites = getFavorites()
    const isFavorited = favorites.includes(data.id)

    section.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.artist_display}</p>
    <p>${data.date_display}</p>
    <p>${data.medium_display}</p>
    <button id="fave-btn"> ${isFavorited ? '❤️ Unfavorite' : '🤍 Favorite'}</button>
    `

    document.querySelector('#fave-btn').addEventListener('click', () => {
        if (isFavorited){
            removeFavorites(data.id)
        } else {
            addFavorites(data.id)

        }
        renderSingleArt(data)
        renderFavorites()
    })

  
    


    
}

const favoriteList = document.querySelector('#favorites-list')
favoriteList.addEventListener('click', async (e) => {
    const li = e.target.closest('li')
    if (!li || !li.dataset.id ) return

    const {data, error} = await getArtworksById(li.dataset.id)
    if (error) return console.warn('error fetching favorite', error)
        renderSingleArt(data)
})
renderFavorites()
async function loadArtworks() {
    let { data, error } = await getArtworks()
    if (error) {
        return console.warn(`Sorry seems like there's been an error!`, error)
    }
    renderArtworks(data)
    
    
    const ul = document.querySelector('#artwork-list')
    ul.addEventListener('click', async (Event) => {
        const card = Event.target.closest('li')
        if (!card) return

        const id = card.dataset.id
        const {data,error} = await getArtworksById(id)
        if(error) {
            return console.warn('Error fetching artwork details', error)
        }
        renderSingleArt(data)
       

    })

 };
loadArtworks()

const form = document.querySelector('#search-form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const input = document.querySelector('#search')
    const query = input.value

    const {data,error} = await getArtworksBySearch (query)
    if (error) {
        return console.warn('search error', error)
    }


    renderArtworks(data)

    form.reset()
})





