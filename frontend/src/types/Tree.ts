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

// an enum for sex types, either male or female.
enum SexEnum {
    Male = "Male",
    Female = "Female",
}

interface Tree {
    id: string;
    name: string;
    userId: string;
    Person: Person[];
}

export { type Tree, type Person, SexEnum };
