const baseUrl: string = "https://www.omdbapi.com/?"
const apiKey: string = `&apikey=${process.env.API_KEY}`

const getMovie = async (
    title: any,
    page: number = 1,
    type?: string,
    year?: number) => {
        const titleQuery: string = `&s=${title}`
        const pageQuery: string = `&page=${page}`
        const typeQuery: string = type? `&type=${type}` : ``
        const yearQuery: string = year? `&y=${year}`: ``

        const url: string = baseUrl + titleQuery + pageQuery + typeQuery + yearQuery + apiKey

        return await fetch(url)
            .then(async (response) => await response.json())
}

const getMovieById = async (id: number) => {
    const url: string = baseUrl + `i=${id}` + apiKey
    await fetch(url)
        .then(async (response) => await response.json())
        .then(result => result)
}

export {
    getMovie,
    getMovieById
}