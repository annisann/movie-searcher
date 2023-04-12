import Image from 'next/image'
import { Navbar, Input, Dropdown, FormElement, Button } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function NavBar(props: {
    selectedType: Set<string>,
    typeValue: string,
    year: number,
    setYear: Dispatch<SetStateAction<number>>,
    setSelectedType: Dispatch<SetStateAction<Set<string>>>,
    setSearchQuery: Dispatch<SetStateAction<any>>,
    handleSearch: () => void
}) {
    const {
        selectedType,
        typeValue,
        year,
        setYear,
        setSelectedType,
        setSearchQuery,
        handleSearch } = props

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
                            setSearchQuery(input.value)
                            handleSearch
                        }
                    }} />
            </Navbar.Content>
            <Navbar.Content>
                <Input
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement
                        if (e.key == "Enter") {
                            setYear(+input.value)
                            handleSearch
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