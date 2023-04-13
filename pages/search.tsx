import styles from '@/styles/movies.module.css'
import Image from 'next/image';
import NavBar from '@/components/navbar';
import { getMovie, getMovieById } from '@/lib/searchMovie';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MovieDetail, SearchResponse } from '@/lib/interfaces';
import { MovieDetailModal } from '@/components/movieDetail';
import {
    Badge,
    Card,
    Grid,
    Loading,
    Pagination,
    Spacer
} from '@nextui-org/react';

export async function getServerSideProps(context: any) {
    const { query } = context || {};
    const { q, y, type } = query || {};

    return {
        props: {
            q: q || null,
            y: y || null,
            type: type || 'movie',
        },
    };
}

export default function Search() {
    const router = useRouter();
    // Content per page. The default value from IMDB Open API is 10 and we cannot change it.
    const amountContents = 10

    // Get the query parameter from URL.
    const { q, y, type } = router.query || {};

    // Search query.
    const [searchQuery, setSearchQuery] = useState<any>(q)
    // `Type` dropdown on navbar: movie | series | episode 
    const [selectedType, setSelectedType] = useState(new Set([type]));
    // Year value on navbar
    const [year, setYear] = useState(y? +y : 0)

    // Set current page number for pagination and making request purposes.
    const [page, setPage] = useState<number>(1)
    // TODO: Message if there's something wrong e.g in request
    const [message, setMessage] = useState<string>("")
    // This state shows whether the loader will show or not.
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // API response for movie searching in a state.
    const [movieData, setMovieData] = useState<SearchResponse>({
        movies: [],
        total: 0,
        response: false
    })
    // Clicked movie card will display a modal. This state shows whether the movie card is clicked or not.
    const [isMovieDetailOpen, setIsMovieDetailOpen] = useState<boolean>(false)
    // Movie detail of clicked movie card.
    const [clickedMovie, setClickedMovie] = useState<MovieDetail>({
        title: "",
        year: 0,
        imdbID: "",
        type: "",
        poster: "",
        rated: "",
        released: "",
        runtime: "",
        genre: "",
        director: "",
        writer: "",
        actors: "",
        plot: "",
        language: "",
        country: "",
        awards: "",
        ratings: [],
        metascore: "",
        imdbRating: "",
        imdbVotes: "",
        dvd: "",
        boxOffice: "",
        production: "",
        website: "",
        response: false
    })

    // Set type value on navbar based on `selectedType` state.
    const typeValue = useMemo(() =>
        // If type is unselected, will display it's original value: `type`
        Array.from(selectedType).length !== 0 ? Array.from(selectedType).join(", ").replaceAll("_", " ") : "type",
        [selectedType]
    )

    // Will send request to API if page, year, and type values change.
    useEffect(() => {
        fetchMovies()
    }, [page, typeValue, year])

    // Get movies from IMDB API by search query.
    const fetchMovies = async () => {
        // Display loader as data has not been fetched.
        setIsLoading(true)
        // Fetch movies based on query and page.
        getMovie(searchQuery, page, typeValue, year)
            .then((result: any) => {
                // Display error message if request failed.
                "Error" in result ?
                    setMessage(result.Error)
                    : // Set movie data state from API response.
                    setMovieData({
                        ...movieData,
                        movies: result.Search,
                        total: +result.totalResults,
                        response: result.Response === "True"
                    })
                // Set loading as false as data has been fetched.
                setIsLoading(false)
            })
    }

    // Get details of selected movie from IMDB API.
    const fetchMovieById = async (movie: any) => {
        // Display loader as data has not been fetched.
        setIsLoading(true)
        // Fetch movie detail based on its ID.
        getMovieById(movie.imdbID)
            .then((result: any) => {
                // Display error message if request failed.
                "Error" in result ?
                    setMessage(result.Error)
                    : // Set clicked card's data to state.
                    setClickedMovie({
                        ...clickedMovie,
                        title: result.Title,
                        year: result.Year,
                        imdbID: result.imdbID,
                        type: result.Type,
                        poster: result.Poster,
                        rated: result.Rated,
                        released: result.Released,
                        runtime: result.Runtime,
                        genre: result.Genre,
                        director: result.Director,
                        writer: result.Writer,
                        actors: result.Actors,
                        plot: result.Plot,
                        language: result.Language,
                        country: result.Country,
                        awards: result.Awards,
                        ratings: result.Ratings,
                        metascore: result.Metascore,
                        imdbRating: result.imdbRating,
                        imdbVotes: result.imdbVotes,
                        dvd: result.DVD,
                        boxOffice: result.BoxOffice,
                        production: result.Production,
                        website: result.Website,
                        response: result.Response
                    })
                // Set loading as false as data has been fetched.
                setIsLoading(false)
                // Open modal that displays the movie detail.
                setIsMovieDetailOpen(true)
            })
    }
    
    const handleSearch = () => {
        /**
         * To set URL and make request based on navbar values: movie title, year, and type.
         */

        // Set the url.
        let searchUrl: string = searchQuery ? `q=${searchQuery}` : "?"
        if (year) searchUrl += `&y=${year}`

        type ? (
            type !== typeValue && typeValue !== "type" ?
                searchUrl += `&type=${typeValue}` : searchUrl += `&type=${type}`
        ) : null

        // Will make request when button is clicked and update the url.
        router.push({
            pathname: "/search",
            search: searchUrl,
        })
        fetchMovies()

    }

    const loading = () => {
        return (
            <Loading className={styles.loader} type='points' />
        )
    }

    return (
        <>
            <NavBar
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                year={year}
                setYear={setYear}
                selectedType={selectedType}
                typeValue={typeValue}
                setSearchQuery={setSearchQuery}
                setSelectedType={setSelectedType} />
            <main className={styles.page}>
                {isLoading ? loading() : null}
                {message ? message : `Search on title "${searchQuery}" has a total of ${movieData.total} results.`}
                <Grid.Container gap={2} className={styles.content}>
                    {movieData.movies.map((movie: any) => (
                        <Grid>
                            <Card
                                isPressable
                                onPress={() => fetchMovieById(movie)}
                                key={movie.imdbID}
                                aria-label={`${movie.imdbID}-${movie.year}`}
                                className={styles.movieCard}>
                                <Card.Header className={styles.poster}>
                                    <Image
                                        src={movie.Poster !== "N/A" ? movie.Poster : ""}
                                        alt="movie poster"
                                        width={140} height={160} />
                                </Card.Header>
                                <Card.Body className={styles.cardBody}>
                                    <Badge
                                        size={"xs"}
                                        disableOutline
                                        variant={"bordered"}
                                        color={"primary"}> {movie.Type} </Badge>
                                    <p className={styles.title}> {movie.Title} ({movie.Year}) </p>
                                </Card.Body>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
                <Pagination
                    bordered
                    rounded
                    className={styles.pagination}
                    onChange={(page: number) => setPage(page)}
                    color={"primary"}
                    total={Math.ceil(movieData.total / amountContents)} />
            </main>
            <Spacer />
            {isLoading ? loading()
                : <MovieDetailModal
                    isOpen={isMovieDetailOpen}
                    setIsOpen={setIsMovieDetailOpen}
                    data={clickedMovie} />}
        </>
    );
}
