import { ChangeEvent, useEffect, useState } from "react"
import { Button, FormElement, Input, PressEvent } from "@nextui-org/react"
import { getMovie } from "@/lib/searchMovie"
import { useRouter } from "next/router";
import styles from "@/styles/landing.module.css"



export default function Landing() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")

  const searchMovie = () => {
    router.push({
      pathname: "/search",
      search: `q=${searchQuery}`,
    })
  }

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
        onPress={searchMovie}> search </Button>
    </main>
  )
}
