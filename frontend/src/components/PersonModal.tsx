// PersonModal.tsx
import { Modal, ModalBody, ModalHeader, Button, ModalContent } from "@nextui-org/react";
import { Person } from "@/types/Tree";

function PersonModal({ person, isOpen, onClose }: { person: Person; isOpen: boolean; onClose: () => void }) {
    console.log(isOpen);
    return (
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {person.firstName} {person.middleName} {person.lastName}
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                <strong>Nickname:</strong> {person.nickName}
                            </p>
                            <p>
                                <strong>Birth Date:</strong> {new Date(person.birthDate).toLocaleDateString()}
                            </p>
                            {person.deathDate && (
                                <p>
                                    <strong>Death Date:</strong> {new Date(person.deathDate).toLocaleDateString()}
                                </p>
                            )}
                            <p>
                                <strong>Comments:</strong> {person.comments}
                            </p>
                            {/* Add more person details here as needed */}
                            <Button onClick={onClose}>Close</Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default PersonModal;
