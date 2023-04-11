import styles from "@/styles/movies.module.css"
import Image from "next/image"
import { Badge, Modal } from "@nextui-org/react"
import { Dispatch, SetStateAction } from "react"
import { Movie, MovieDetail } from "@/lib/interfaces"

export const MovieDetailModal = ({
    isOpen,
    setIsOpen,
    data
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    data: MovieDetail
}) => {
    return (
        <Modal
            noPadding
            className={styles.modalContainer}
            open={isOpen}
            onClose={() => setIsOpen(!isOpen)}>
            <Modal.Header className={styles['modal-header-container']}>
                <Image
                    src={data.poster !== "N/A" ? data.poster : ""}
                    alt="movie poster"
                    width={140} height={160} />
                <div>
                    <div className={styles['modal-header-container--title']}>
                        <p className={styles['header-title']}> {data?.title} ({data?.year}) </p>
                        <Badge>
                            <p className={styles.rated}> {data?.rated} </p>
                        </Badge>
                    </div>
                    <div className={styles['modal-header-container--body']}>
                        <p className={styles.type}> {data?.type}, {data?.runtime} </p>
                        <p className={styles.genre}> Genre: {data?.genre} </p>
                        <p className={styles.director}> Director: {data?.director} </p>
                        <p className={styles.actor}> Actor: {data?.actors} </p>
                    </div>
                </div>
            </Modal.Header >
            <Modal.Body className={styles['modal-body-container']}>
                <div className={styles['modal-body-container--head']}>
                    <p className={styles.plot}> {data?.plot}</p>
                </div>
                <div className={styles['modal-body-container--body']}>
                    <div>
                        <p> Language: {data?.language} </p>
                        <p> Released: {data?.released} </p>
                        <p> Country: {data?.country} </p>
                    </div>
                    <p> IMDB Rating: {data?.imdbRating} </p>
                </div>
            </Modal.Body>
        </Modal>
    )
}