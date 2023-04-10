import { getMovie } from '@/lib/searchMovie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Movie {
    title: string;
    year: number;
    imdbID: string;
    type: string;
    poster: string;
}

interface MovieDetail extends Movie {
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

interface SearchResponse {
    movies: Movie[];
    total: number;
    response: boolean;
}

interface ErrorResponse {
    Response: string;
    Error: string;
}

export default function Movies() {
    const router = useRouter();
    const { q } = router.query; // search query

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState<SearchResponse>({
        movies: [],
        total: 0,
        response: false
    })

    const fetchMovies = async () => {
        // Get movies from IMDB API by search query
        getMovie(q)
            .then((result: any) => {
                // Display error message if request failed.
                "Error" in result ?
                    setMessage(result.Error) :
                    setMovieData({
                        ...movieData,
                        movies: result.Search,
                        total: +result.totalResults,
                        response: result.Response === "True"
                    })
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchMovies()
    }, [q])
    // console.log('movieData', movieData)
    return (
        <> {message ? message : `Found! Movie with title ${q} has ${movieData.total} results.`} </>
    );
}
