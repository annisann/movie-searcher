import { ChangeEvent, useEffect, useState } from "react"
import { Button, FormElement, Input } from "@nextui-org/react"
import { getMovie } from "@/lib/searchMovie"
import { useRouter } from "next/router";
import styles from "@/styles/landing.module.css"

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

export default function Landing() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [movieData, setMovieData] = useState<SearchResponse>({
    movies: [],
    total: 0,
    response: false
  })

  const fetchMovie = async () => {
    router.push({
      pathname: "/search",
      query: {
        q: searchQuery,
      }
    })

    getMovie(searchQuery)
      .then((result: any) => {
        setMovieData({
          ...movieData,
          movies: result.Search,
          total: +result.totalResults,
          response: result.Response === "True"
        })
        setIsLoading(false)
      })
  }

  console.log(movieData)

  return (
    <main className={styles.container}>
      <Input
        onChange={(e: ChangeEvent<FormElement>) => setSearchQuery(e.target.value)}
        labelPlaceholder="Movie title" />
      <Button
        href="/movies"
        auto
        bordered
        color={"gradient"}
        onPress={fetchMovie}> search </Button>
      <p> {isLoading? "Loading.." : movieData.total} </p>
    </main>
  )
}
