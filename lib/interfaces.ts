export interface Movie {
    title: string;
    year: number;
    imdbID: string;
    type: string;
    poster: string;
}

export interface MovieDetail extends Movie {
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    ratings: [];
    metascore: string; // "82"
    imdbRating: string; // "9.3"
    imdbVotes: string; // "2,718,502"
    dvd: string; // "21 Dec 1999"
    boxOffice: string; // "$28,767,189"
    production: string;
    website: string;
    response: boolean // "True"
}

export interface SearchResponse {
    movies: Movie[];
    total: number;
    response: boolean;
}

export interface ErrorResponse {
    Response: string;
    Error: string;
}