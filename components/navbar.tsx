import { Navbar, Input, Dropdown, FormElement, Button } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";

export default function NavBar(props: {
    selectedType: Set<string>,
    typeValue: string,
    setSelectedType: Dispatch<SetStateAction<Set<string>>>,
    setSearchQuery: Dispatch<SetStateAction<any>>,
    handleSearch: () => void
}) {
    const {
        selectedType,
        typeValue,
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
                    onChange={(e: ChangeEvent<FormElement>) => setSearchQuery(e.target.value)}
                    placeholder="Movie title" />
                <Button
                    auto
                    onPress={handleSearch}>
                    search
                </Button>
            </Navbar.Content>
            <Navbar.Content>
                <Input placeholder="Year" />
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