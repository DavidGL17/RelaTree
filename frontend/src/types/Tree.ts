interface Person {
    id: string;
    familyTreeId: string;
    firstName: string;
    middleName: string;
    nickName: string;
    lastName: string;
    sex: string;
    birthDate: Date;
    deathDate: Date | null;
    comments: string;
    parent1Id: string | null;
    parent2Id: string | null;
}

interface Tree {
    id: string;
    name: string;
    userId: string;
    Person: Person[];
}

export { type Tree, type Person };
