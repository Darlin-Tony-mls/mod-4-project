import { getArtworks, getArtworksBySearch, getArtworksById } from "./fetch.js";

import { getFavorites, addFavorites, removeFavorites } from "./favorites.js";

const renderArtworks = (arr) => {
    const ul = document.querySelector('#artwork-list')
    ul.innerHTML = ''

    arr.forEach((artwork) => {
        const li = document.createElement('li')

        const imageUrl = artwork.image_id
            ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`
            : ''

        li.dataset.id = artwork.id

        li.innerHTML = `
            <h3>${artwork.title}</h3>
            ${artwork.image_id ? `<img src="${imageUrl}" alt="${artwork.title}">` : ''}
        `

        ul.append(li)
    })
}

const renderSingleArt = (data) => {
    const section = document.querySelector('#artwork-detail')
    const favorites = getFavorites()
    const isFavorited = favorites.includes(data.id)

    const imageUrl = data.image_id
        ? `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`
        : ''

    section.innerHTML = `
        <h2>${data.title}</h2>
        ${data.image_id ? `<img src="${imageUrl}" alt="${data.title}">` : ''}
        <p>${data.artist_display}</p>
        <p>${data.date_display}</p>
        <p>${data.medium_display}</p>
        <button id="fave-btn">
            ${isFavorited ? '❤️ Unfavorite' : '🤍 Favorite'}
        </button>
    `

    document.querySelector('#fave-btn').addEventListener('click', () => {
        if (isFavorited) {
            removeFavorites(data.id)
        } else {
            addFavorites(data.id)
        }
        renderSingleArt(data)
    })
}

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
        const { data, error } = await getArtworksById(id)
        if (error) {
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

    const { data, error } = await getArtworksBySearch(query)
    if (error) {
        return console.warn('search error', error)
    }


    renderArtworks(data)

    form.reset()
})





