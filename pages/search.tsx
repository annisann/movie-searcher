import { getMovie } from '@/lib/searchMovie';
import { Card, Dropdown, Grid, Input, Navbar, Pagination } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/movies.module.css'

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
    
    return (
        <>
            <Navbar variant={"sticky"}>
                <Navbar.Brand>
                    {/* <Image src="favicon.svg" alt="logo" width={20} height={20} /> */}
                </Navbar.Brand>
                <Navbar.Content>
                    <Input placeholder="Movie title" />
                </Navbar.Content>
                <Navbar.Content>
                    <Input placeholder="Year" />
                    <Dropdown>
                        <Dropdown.Button flat> Genre </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                            <Dropdown.Item key="new">New file</Dropdown.Item>
                            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                            <Dropdown.Item key="delete" color="error">
                                Delete file
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Content>
            </Navbar>
            <main className={styles.page}>
                {message ? message : `Found! Movie with title ${q} has ${movieData.total} results.`}
                
                <Grid.Container gap={2}>
                    {movieData.movies.map((movie: any) => (
                        <Grid>
                            <Card className={styles.movieCard}>
                                <Card.Header>
                                    <p> {movie.Title} </p>
                                </Card.Header>
                                <Card.Body>

                                </Card.Body>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            </main>
            <Pagination total={movieData.total}/>
        </>
    );
}
