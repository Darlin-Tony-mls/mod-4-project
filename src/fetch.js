export async function getArtworks() {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks`)
        if (!response.ok) {
            throw Error(`Failed to load artwork${response.status} ${response.statusText}`);
        }
        const responseData = await response.json()
        // console.log(responseData)
        // const artwork = responseData.data.map((artwork) => ({
        //     id: artwork.id, !!!NOTE: THIS WAY STILL WORKS, ITS JUST A MORE DIFFICULT WAY OF GOING ABOUT IT.!!!!
        // }));
        // return artwork
        console.log(responseData.data)
        return { data: responseData.data, error: null }// This way is simpler to read and easier to code 
    }
    catch (error) {
        console.warn('Error caught', error)
        return { data: null, error: error }
    }
}

export async function getArtworksById(id) {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
        if (!response.ok) {
            throw Error(`Failed to load artwork ID ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()
        console.log(responseData.data)
        return { data: responseData.data, error: null }
    }
    catch (error) {
        console.warn(`Looks like we've got an Error!`, error);
        return { data: null, error: error }
    }
}

export async function getArtworksBySearch(query) {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}`)
        if (!response.ok) {
            throw Error(`Fetch failed ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()
        console.log(responseData)  // ← log the whole thing, not just .data
        return { data: responseData.data, error: null }
    } catch (error) {
        return { data: null, error: error }
    }
}





