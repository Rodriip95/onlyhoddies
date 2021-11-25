// https://api.mercadolibre.com/sites/MLA/search?category=MLA109085

const host = 'https://api.mercadolibre.com/'

const category_hoddies = 'MLA109085'

export const getHoddies = async () => {
    console.log("Checking...");
    try {
        let res = await fetch(`${host}sites/MLA/search?category=${category_hoddies}`)
        let data = res.json()
        return data
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getHoddieById = async (id) => {
    console.log("Checking...");
    try {
        let res = await fetch(`${host}items/${id}`)
        let data = res.json()
        return data
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getHoddieByIdDescription = async (id) => {
    console.log("Checking...");
    try {
        let res = await fetch(`${host}items/${id}/description`)
        let data = res.json()
        return data
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getHoddiesThen = () => {
    console.log("Checking...");
    fetch(`${host}search?category=${category_hoddies}`)
    .then(res => res.json())
    .then( data => {
        return data.results
    })
}