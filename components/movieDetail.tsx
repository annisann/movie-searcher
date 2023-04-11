import Image from "next/image"
import { Modal } from "@nextui-org/react"
import { Dispatch, SetStateAction } from "react"
import { Movie, MovieDetail } from "@/lib/interfaces"

export const MovieDetailModal = ({
    isOpen,
    setIsOpen,
    data
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    data: Movie | MovieDetail
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(!isOpen)}>
            <Image
                src={data.poster !== "N/A" ? data.poster : ""}
                alt="movie poster"
                width={140} height={160} />
            <p> {data?.title}</p>
        </Modal>
    )
}