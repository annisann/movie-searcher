import styles from "@/styles/movies.module.css"
import Image from "next/image"
import { Badge, Modal } from "@nextui-org/react"
import { Dispatch, SetStateAction } from "react"
import { MovieDetail } from "@/lib/interfaces"
import { isNotRated } from "@/lib/colorHelper"

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
            width={"500px"}
            noPadding
            className={styles['modal-container']}
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
                        <Badge
                            variant={"bordered"}
                            className={styles['header-badge']}
                            color={isNotRated(data?.rated) ? "default": "success"}>
                            {data?.rated}
                        </Badge>
                    </div>
                    <div className={styles['modal-header-container--body']}>
                        <p className={styles.type}> {data?.type}, {data?.runtime} </p>
                        <p className={styles.genre}>
                            <span className={styles.highlighted}>
                                {"Genre: "}
                            </span>
                            {data?.genre}
                        </p>
                        <p className={styles.director}>
                            <span className={styles.highlighted}>
                                {"Director: "}
                            </span>
                            {data?.director}
                        </p>
                        <p className={styles.actor}>
                            <span className={styles.highlighted}>
                                {"Actor: "}
                            </span>
                            {data?.actors} </p>
                    </div>
                </div>
            </Modal.Header >
            <Modal.Body className={styles['modal-body-container']}>
                <div className={styles['modal-body-container--head']}>
                    <p className={styles.plot}> {data?.plot}</p>
                </div>
                <div className={styles['modal-body-container--body']}>
                    <div>
                        <p> <span className={styles.highlighted}>Language:</span> {data?.language} </p>
                        <p> <span className={styles.highlighted}>Released:</span> {data?.released} </p>
                        <p> <span className={styles.highlighted}>Country:</span> {data?.country} </p>
                    </div>
                    <p> <span className={styles.highlighted}>IMDB Rating:</span> {data?.imdbRating} </p>
                </div>
            </Modal.Body>
        </Modal >
    )
}