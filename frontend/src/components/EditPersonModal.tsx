// EditPersonModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Person, SexEnum } from "@/types/Tree";

interface EditPersonModalProps {
    person: Person | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (person: Person) => void;
}

function EditPersonModal({ person, isOpen, onClose, onSave }: EditPersonModalProps) {
    const [formData, setFormData] = useState<Person>({
        id: "",
        familyTreeId: "",
        firstName: "",
        middleName: "",
        nickName: "",
        lastName: "",
        sex: SexEnum[SexEnum.Male],
        birthDate: new Date(),
        deathDate: null,
        comments: "",
        parent1Id: null,
        parent2Id: null,
    });

    useEffect(() => {
        if (person) {
            // Ensure birthDate and deathDate are Date objects
            const { birthDate, deathDate, ...rest } = person;
            setFormData({
                ...rest,
                birthDate: birthDate ? new Date(birthDate) : new Date(),
                deathDate: deathDate ? new Date(deathDate) : null,
            });
        }
    }, [person]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Handle date fields specifically
        if (name === "birthDate" || name === "deathDate") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value ? new Date(value) : null,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    // TODO missing being able to add parents

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {person ? `Edit ${person.firstName} ${person.lastName}` : "Create New Person"}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Middle Name"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                            <Input label="Nickname" name="nickName" value={formData.nickName} onChange={handleChange} />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <Select label="Sex" name="sex" value={formData.sex} onChange={handleChange}>
                                {/* Map each element of the enum to a SelectItem */}
                                {Object.values(SexEnum).map((sex) => (
                                    <SelectItem key={sex}>{sex}</SelectItem>
                                ))}
                            </Select>
                            <Input
                                type="date"
                                label="Birth Date"
                                name="birthDate"
                                value={formData.birthDate.toISOString().split("T")[0]}
                                onChange={handleChange}
                            />
                            <Input
                                type="date"
                                label="Death Date"
                                name="deathDate"
                                value={formData.deathDate ? formData.deathDate.toISOString().split("T")[0] : ""}
                                onChange={handleChange}
                            />
                            <Input label="Comments" name="comments" value={formData.comments} onChange={handleChange} />
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditPersonModal;
