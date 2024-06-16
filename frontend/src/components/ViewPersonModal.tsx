// PersonModal.tsx
import { Modal, ModalBody, ModalHeader, Button, ModalContent } from "@nextui-org/react";
import { Person, Tree } from "@/types/Tree";

function ViewPersonModal({
    person,
    tree,
    isOpen,
    onClose,
}: {
    person: Person;
    tree: Tree;
    isOpen: boolean;
    onClose: () => void;
}) {
    // compute Age
    let age = 0;
    if (person.deathDate === null) {
        age = Math.floor((new Date().getTime() - new Date(person.birthDate).getTime()) / 31536000000);
    } else {
        age = Math.floor((new Date(person.deathDate).getTime() - new Date(person.birthDate).getTime()) / 31536000000);
    }

    // Get the parents of the person
    const parents: { parent1: Person | null; parent2: Person | null } = {
        parent1: null,
        parent2: null,
    };
    if (person.parent1Id) {
        parents.parent1 = tree.Person.find((p) => p.id === person.parent1Id) || null;
    }
    if (person.parent2Id) {
        parents.parent2 = tree.Person.find((p) => p.id === person.parent2Id) || null;
    }

    // Get the potential children of the person
    const children: Person[] = tree.Person.filter((p) => p.parent1Id === person.id || p.parent2Id === person.id);

    return (
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {person.firstName} {person.middleName} {person.lastName}{" "}
                        </ModalHeader>
                        {/* TODO make the parents and children interactible, when pressed it closes the modal and opens one with them. */}
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

export { ViewPersonModal };
