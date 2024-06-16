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
import { ViewPersonModal } from "@/components/ViewPersonModal";
import EditPersonModal from "@/components/EditPersonModal";

function PersonCard({ person, tree }: { person: Person; tree: Tree }) {
    const [selectedOption, setSelectedOption] = useState<string>("view");
    const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const [currentPerson, setCurrentPerson] = useState<Person>(person);

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
        onViewModalOpen();
    };

    const handleEdit = () => {
        console.log("Editing person:", person);
        onEditModalOpen();
    };

    const handleDelete = () => {
        console.log("Deleting person:", person);
        // TODO Add logic to delete the person from your data store
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

    const handleSavePerson = (updatedPerson: Person) => {
        console.log("Saved person:", updatedPerson);
        setCurrentPerson(updatedPerson);
        // Add logic to save the person to your data store
        // TODO
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center w-full">
                        <h5>
                            {currentPerson.firstName} {currentPerson.middleName} {currentPerson.lastName}{" "}
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
                        {currentPerson.firstName} {currentPerson.middleName} &quot;{currentPerson.nickName}&quot;{" "}
                        {currentPerson.lastName} {new Date(currentPerson.birthDate).getFullYear()}-
                        {currentPerson.deathDate && new Date(currentPerson.deathDate).getFullYear()}
                    </p>
                </CardBody>
            </Card>
            <ViewPersonModal person={person} tree={tree} isOpen={isViewModalOpen} onClose={onViewModalClose} />
            <EditPersonModal
                person={currentPerson}
                isOpen={isEditModalOpen}
                onClose={onEditModalClose}
                onSave={handleSavePerson}
            />
        </>
    );
}

export default PersonCard;
