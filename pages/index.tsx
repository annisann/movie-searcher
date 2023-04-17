import { ChangeEvent, useEffect, useState } from "react"
import { Button, FormElement, Input, PressEvent } from "@nextui-org/react"
import { useRouter } from "next/router";
import styles from "@/styles/landing.module.css"



export default function Landing() {
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState("")
    const [message, setMessage] = useState("")

    const searchMovie = () => {
        searchQuery ?
            router.push({
                pathname: "/search",
                search: `q=${searchQuery}`,
            }) : setMessage("Oops, you forgot to input the movie title.")
    }

    return (
        <main className={styles.landingPage}>
            {/* <p> ENZ.mov </p> */}
            <div className={styles.container}>
                <Input
                    className={styles.searchInput}
                    size="xl"
                    onChange={(e: ChangeEvent<FormElement>) => setSearchQuery(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement
                        if (e.key == "Enter") {
                            // Will not send request if user does not input a movie title.
                            if (input.value) setSearchQuery(input.value)
                            searchMovie()
                        }
                    }}
                    labelPlaceholder="Movie title" />
                <Button
                    className={styles.searchButton}
                    auto
                    bordered
                    color={"gradient"}
                    onPress={searchMovie}> search </Button>
            </div>
            <p className={styles.message}> {message} </p>
        </main>
    )
}
