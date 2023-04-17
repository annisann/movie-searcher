import Image from 'next/image'
import { Navbar, Input, Dropdown, FormElement } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

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

    // Set movie title input value at navbar.
    const [input, setInput] = useState<string>(searchQuery)

    useEffect(() => {
        // Make request and set the URL when there's changes on navbar values.
        handleSearch()
    }, [searchQuery, year, selectedType])

    return (
        <Navbar variant={"sticky"}>
            <Navbar.Brand>
                <p> ENZ.mov </p>
            </Navbar.Brand>
            <Navbar.Content>
                <Input
                    type="text"
                    value={input}
                    clearable
                    placeholder="Movie title"
                    contentRight={
                        <Image
                        src="magnifierIcon.svg"
                        alt="search"
                        width={24}
                        height={24} />
                    }
                    onChange={(event: ChangeEvent<FormElement>) => setInput(event.target.value)}
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
                        {typeValue ? typeValue.toUpperCase() : "type".toUpperCase()}
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