// PersonModal.tsx
import { Modal, ModalBody, ModalHeader, Button, ModalContent } from "@nextui-org/react";
import { Person } from "@/types/Tree";

interface ParentsForModal {
    parent1: Person | null;
    parent2: Person | null;
}

function PersonModal({
    person,
    parents,
    isOpen,
    onClose,
}: {
    person: Person;
    parents: ParentsForModal;
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
                            {/* Add more person details here as needed */}
                            <Button onClick={onClose}>Close</Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export { PersonModal, type ParentsForModal };
