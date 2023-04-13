import Image from 'next/image'
import { Navbar, Input, Dropdown } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function NavBar(props: {
    selectedType: Set<any>,
    searchQuery: any,
    typeValue: string,
    year: number,
    setYear: Dispatch<SetStateAction<number>>,
    setSelectedType: Dispatch<SetStateAction<Set<any>>>,
    setSearchQuery: Dispatch<SetStateAction<any>>,
    handleSearch: () => void
}) {
    const {
        selectedType,
        searchQuery,
        typeValue,
        year,
        setYear,
        setSelectedType,
        setSearchQuery,
        handleSearch } = props

    useEffect(() => {
        // Make request and set the URL when there's changes on navbar values.
        handleSearch()
    }, [searchQuery, year, selectedType])
    
    return (
        <Navbar variant={"sticky"}>
            <Navbar.Brand>
                {/* <Image src="favicon.svg" alt="logo" width={20} height={20} /> */}
            </Navbar.Brand>
            <Navbar.Content>
                <Input
                    placeholder="Movie title"
                    contentRight={
                        <Image
                            src="magnifierIcon.svg"
                            alt="search"
                            width={24}
                            height={24} />
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement
                        if (e.key == "Enter") {
                            // Will not send request if user does not input a movie title.
                            if (input.value) setSearchQuery(input.value)
                        }
                    }} />
            </Navbar.Content>
            <Navbar.Content>
                <Input
                    clearable
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement
                        if (e.key == "Enter") {
                            setYear(+input.value)
                        }
                    }}
                    placeholder="Year" />
                <Dropdown>
                    <Dropdown.Button
                        bordered
                        color={"primary"}>
                        {typeValue ? typeValue.toUpperCase() : "type"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={selectedType}
                        onSelectionChange={(keys: any) => setSelectedType(keys)}
                        aria-label="type action">
                        <Dropdown.Item key="movie"> Movie </Dropdown.Item>
                        <Dropdown.Item key="series"> Series </Dropdown.Item>
                        <Dropdown.Item key="episode"> Episode </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        </Navbar >
    )
}