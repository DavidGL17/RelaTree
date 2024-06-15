// PersonModal.tsx
import { Modal, ModalBody, ModalHeader, Button, ModalContent } from "@nextui-org/react";
import { Person } from "@/types/Tree";

interface ParentsForModal {
    parent1: Person | null;
    parent2: Person | null;
}

function ViewPersonModal({
    person,
    parents,
    children,
    isOpen,
    onClose,
}: {
    person: Person;
    parents: ParentsForModal;
    children: Person[];
    isOpen: boolean;
    onClose: () => void;
}) {
    let age = 0;
    if (person.deathDate === null) {
        age = Math.floor((new Date().getTime() - new Date(person.birthDate).getTime()) / 31536000000);
    } else {
        age = Math.floor((new Date(person.deathDate).getTime() - new Date(person.birthDate).getTime()) / 31536000000);
    }

    return (
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {person.firstName} {person.middleName} {person.lastName}{" "}
                        </ModalHeader>
                        {/* TODO make the parents and children interactible, when pressed it closes the modal and opens one with them. Potentially, remove the children and parents props, and pass the tree. That way the computation is only done when we open the modal, might be faster for big trees*/}
                        <ModalBody>
                            <p>
                                <strong>Nickname:</strong> {person.nickName}
                            </p>
                            <p>
                                <strong>Birth Date:</strong> {new Date(person.birthDate).toLocaleDateString("sw-CH")}
                                {person.deathDate === null && ` (${age} years)`}
                            </p>
                            {person.deathDate && (
                                <p>
                                    <strong>Death Date:</strong>{" "}
                                    {new Date(person.deathDate).toLocaleDateString("sw-CH")}
                                    {` (${age} years)`}
                                </p>
                            )}
                            <p>
                                <strong>Comments:</strong> {person.comments}
                            </p>
                            {/* Adding the Name of the parents */}
                            {parents.parent1 && (
                                <p>
                                    <strong>Parent 1:</strong> {parents.parent1.firstName} {parents.parent1.middleName}{" "}
                                    {parents.parent1.lastName}
                                </p>
                            )}
                            {parents.parent2 && (
                                <p>
                                    <strong>Parent 2:</strong> {parents.parent2.firstName} {parents.parent2.middleName}{" "}
                                    {parents.parent2.lastName}
                                </p>
                            )}

                            {/* Display the children, if there are any */}
                            {children.length > 0 && (
                                <p>
                                    <strong>Children:</strong>
                                    <ul className="list-disc pl-5">
                                        {children.map((child) => (
                                            <li key={child.id}>
                                                {child.firstName} {child.middleName} {child.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                </p>
                            )}

                            {/* Add more person details here as needed */}
                            <Button onClick={onClose}>Close</Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export { ViewPersonModal, type ParentsForModal };
