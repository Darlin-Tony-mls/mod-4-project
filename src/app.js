import { getArtworks, getArtworksBySearch, getArtworksById } from "./fetch.js";

const renderArtworks = (arr) => {
    const ul = document.querySelector('#artwork-list')

    arr.forEach((artwork) => {
        const li = document.createElement('li')
        li.textContent = artwork.title
        li.dataset.id = artwork.id
        ul.append(li)
    })
}

async function loadArtworks() {
    let { data, error } = await getArtworks()
    if (error) {
        return console.warn(`Sorry seems like there's been an error!`, error)
    }
    renderArtworks(data)
};
loadArtworks()





