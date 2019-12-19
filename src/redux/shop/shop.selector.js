import {createSelector} from 'reselect'

//removed due to data normalization
// const COLLECTION_ID_MAP = {
//     hats:1,
//     sneakers:2,
//     jackets:3,
//     womens:4,
//     mens:5,

// }

const selectShop = state => state.shop;

//createSelector creates a funtion that accepts a state .. selectCollections
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//this one is a curried function that returns the main function that accepts a state
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    //collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])removed due to data normalization
    collections => collections[collectionUrlParam]
)