"use client";

import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { Person } from "@/types/Tree";
import { useState } from "react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";

function PersonCard(person: Person) {
    const [selectedOption, setSelectedOption] = useState<string>("view");

    const descriptionsMap: Record<string, string> = {
        view: "View details of the person",
        edit: "Edit details of the person",
        delete: "Delete the person",
    };

    const labelsMap: Record<string, string> = {
        view: "View",
        edit: "Edit",
        delete: "Delete",
    };

    const handleSelectionChange = (keys: any) => {
        const selectedKey = Array.from(keys as Set<string>)[0];
        setSelectedOption(selectedKey);
    };

    console.log(person.deathDate);

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center w-full">
                    <h5>
                        {person.firstName} {person.middleName} {person.lastName}{" "}
                    </h5>
                    <ButtonGroup variant="flat" size="sm">
                        <Button>{labelsMap[selectedOption]}</Button>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button isIconOnly>
                                    <ChevronDownIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Merge options"
                                selectedKeys={new Set([selectedOption])}
                                selectionMode="single"
                                onSelectionChange={handleSelectionChange}
                                className="max-w-[300px]"
                            >
                                <DropdownItem key="view" description={descriptionsMap["view"]}>
                                    {labelsMap["view"]}
                                </DropdownItem>
                                <DropdownItem key="edit" description={descriptionsMap["edit"]}>
                                    {labelsMap["edit"]}
                                </DropdownItem>
                                <DropdownItem key="delete" description={descriptionsMap["delete"]}>
                                    {labelsMap["delete"]}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </div>
            </CardHeader>
            <CardBody>
                <p>
                    {person.firstName} {person.middleName} &quot;{person.nickName}&quot; {person.lastName}{" "}
                    {new Date(person.birthDate).getFullYear()}-
                    {person.deathDate && new Date(person.deathDate).getFullYear()}
                </p>
            </CardBody>
        </Card>
    );
}

export default PersonCard;
