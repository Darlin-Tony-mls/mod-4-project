import { getArtworks, getArtworksBySearch, getArtworksById } from "./fetch.js";

const renderArtworks = (arr) => {
    const ul = document.querySelector('#artwork-list')
     ul.innerHTML = ''
    arr.forEach((artwork) => {
        const li = document.createElement('li')
        li.textContent = artwork.title
        li.dataset.id = artwork.id
        ul.append(li)
    })
}

    const renderSingleArt = (data) => {
        const section = document.querySelector('#artwork-detail')
        section.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.artist_display}</p>
        <p>${data.date_display}</p>
        <p>${data.medium_display}</p>`
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





