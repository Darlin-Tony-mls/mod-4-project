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
    
    const ul = document.querySelector('#artwork-list')
    ul.addEventListener('click', async (Event) => {
        const card = Event.target.closest('li')
        if (!card) return

        const id = card.dataset.id
        const {data,error} = await getArtworksById(id)
        if(error) {
            return console.warn('Error fetching artwork details', error)
        }
        console.log(data)
    })

//};
loadArtworks()





