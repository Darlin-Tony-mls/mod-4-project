export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []

}


export const addFavorites = (id) => {
const favorites = getFavorites()
favorites.push(id)
localStorage.setItem('favorites', JSON.stringify(favorites))
}

export const removeFavorites = (id) => {
    const favorites = getFavorites()
    const update = favorites.filter(favId => favId !== id)
    localStorage.setItem('favorites', JSON.stringify(update))
}
