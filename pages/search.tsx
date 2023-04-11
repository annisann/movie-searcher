import styles from '@/styles/movies.module.css'
import Image from 'next/image';
import { getMovie, getMovieById } from '@/lib/searchMovie';
import {
    Badge,
    Card,
    Dropdown,
    Grid,
    Input,
    Loading,
    Navbar,
    Pagination,
    Spacer
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MovieDetail, SearchResponse } from '@/lib/interfaces';
import { MovieDetailModal } from '@/components/movieDetail';


export default function Movies() {
    const router = useRouter();
    const amountContents = 10
    let { q } = router.query; // search query

    const [page, setPage] = useState(1)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [movieData, setMovieData] = useState<SearchResponse>({
        movies: [],
        total: 0,
        response: false
    })
    const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false)
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
    const [selectedType, setSelectedType] = useState(new Set(["Type"]));

    const selectedTypeValue = useMemo(() =>
        // If type is unselected, will display it's original value: `Type`
        Array.from(selectedType).length !== 0 ? Array.from(selectedType).join(", ").replaceAll("_", " ") : "Type",
        [selectedType]
    );

    // Get movies from IMDB API by search query.
    const fetchMovies = async () => {
        // Display loader as data has not been fetched.
        setIsLoading(true)
        // Fetch movies based on query and page.
        getMovie(q, page)
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
                setIsLoading(false)
            })
    }

    // Get details of selected movie from IMDB API.
    const fetchMovieById = async (movie: any) => {
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
                // Open modal that displays the movie detail.
                setIsMovieDetailOpen(true)
            })
    }

    console.log(clickedMovie)

    useEffect(() => {
        fetchMovies()
    }, [q, page])

    return (
        <>
            <Navbar variant={"sticky"}>
                <Navbar.Brand>
                    {/* <Image src="favicon.svg" alt="logo" width={20} height={20} /> */}
                </Navbar.Brand>
                <Navbar.Content>
                    <Input
                        placeholder="Movie title" />
                </Navbar.Content>
                <Navbar.Content>
                    <Input placeholder="Year" />
                    <Dropdown>
                        <Dropdown.Button
                            bordered
                            color={"primary"}>
                            {selectedTypeValue ? selectedTypeValue : "Type"}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            selectedKeys={selectedType}
                            onSelectionChange={(keys: any) => setSelectedType(keys)}
                            aria-label="type action">
                            <Dropdown.Item key="Movie"> Movie </Dropdown.Item>
                            <Dropdown.Item key="Series"> Series </Dropdown.Item>
                            <Dropdown.Item key="Episode"> Episode </Dropdown.Item>
                            <Dropdown.Item key="" color="error"> Clear selection </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Content>
            </Navbar >
            <main className={styles.page}>
                {message ? message : `Search on title "${q}" has a total of ${movieData.total} results.`}

                <Grid.Container gap={2} className={styles.content}>
                    {isLoading ? <Loading type='points' />
                        : movieData.movies.map((movie: any) => (
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
            <MovieDetailModal
                isOpen={isMovieDetailOpen}
                setIsOpen={setIsMovieDetailOpen}
                data={clickedMovie}
            />
        </>
    );
}
