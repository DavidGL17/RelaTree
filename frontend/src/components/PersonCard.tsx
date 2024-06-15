// PersonCard.tsx
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
    useDisclosure,
} from "@nextui-org/react";
import { Person, Tree } from "@/types/Tree";
import { useState } from "react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { PersonModal, ParentsForModal } from "@/components/PersonModal";

function PersonCard({ person, tree }: { person: Person; tree: Tree }) {
    const [selectedOption, setSelectedOption] = useState<string>("view");
    const { isOpen, onOpen, onClose } = useDisclosure();

    // initialize a dict to store the parents of the person as parent1 and parent2
    const parents: ParentsForModal = {
        parent1: null,
        parent2: null,
    };

    // loop through the tree to find the parents of the person
    if (person.parent1Id) {
        parents.parent1 = tree.Person.find((p) => p.id === person.parent1Id) || null;
    }
    if (person.parent2Id) {
        parents.parent2 = tree.Person.find((p) => p.id === person.parent2Id) || null;
    }

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

    const handleView = () => {
        console.log("Viewing person:", person);
        onOpen();
    };

    const handleEdit = () => {
        console.log("Editing person:", person);
        // Add your edit logic here
    };

    const handleDelete = () => {
        console.log("Deleting person:", person);
        // Add your delete logic here
    };

    const handleSelectionChange = (keys: any) => {
        const selectedKey = Array.from(keys as Set<string>)[0];
        setSelectedOption(selectedKey);
        optionHandlers[selectedKey]();
    };

    const optionHandlers: Record<string, () => void> = {
        view: handleView,
        edit: handleEdit,
        delete: handleDelete,
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center w-full">
                        <h5>
                            {person.firstName} {person.middleName} {person.lastName}{" "}
                        </h5>
                        <ButtonGroup variant="flat" size="sm">
                            <Button onClick={optionHandlers[selectedOption]}>{labelsMap[selectedOption]}</Button>
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
            <PersonModal person={person} parents={parents} isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default PersonCard;
