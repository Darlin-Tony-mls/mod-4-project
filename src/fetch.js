export async function getArtwork() {
    try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks')
        if (!response.ok) {
            throw Error(`fetch failed ${response.status} ${response.statusText}`);
        }
        const responseData = await response.json()
        console.log(responseData)

        const artwork = responseData.map((artwork) => ({
            id: artwork.id,
        }));
        return artwork
    }
    catch (error) {
        console.warn('Error caught', error)
        return null
    }
}

