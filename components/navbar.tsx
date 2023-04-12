import { Navbar, Input, Dropdown, FormElement, Button, PressEvent } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";

export default function NavBar({ selectedType, setSelectedType, setSearchQuery, handleSearch }: {
    selectedType: Set<string>,
    setSelectedType: Dispatch<SetStateAction<Set<string>>>,
    setSearchQuery: Dispatch<SetStateAction<any>>,
    handleSearch: () => void
}) {
    const selectedTypeValue = useMemo(() =>
        // If type is unselected, will display it's original value: `Type`
        Array.from(selectedType).length !== 0 ? Array.from(selectedType).join(", ").replaceAll("_", " ") : "Type",
        [selectedType]
    )

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
                        {selectedTypeValue ? selectedTypeValue : "Type"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={selectedType}
                        onSelectionChange={(keys: any) => setSelectedType(keys)}
                        aria-label="type action">
                        <Dropdown.Item key="Movie"> Movie </Dropdown.Item>
                        <Dropdown.Item key="Series"> Series </Dropdown.Item>
                        <Dropdown.Item key="Episode"> Episode </Dropdown.Item>
                        <Dropdown.Item key="" color="error"> Clear selection </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        </Navbar >
    )
}