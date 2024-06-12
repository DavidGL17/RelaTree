// import { Tree, Person } from "@/types/Tree";
// import { Tree as TreeComponent, TreeNodeDatum } from "react-d3-tree";

// interface FamilyTreeD3Props {
//     treeData: Tree;
// }

// function transformData(people: Person[]): TreeNodeDatum {
//     const map: { [key: string]: TreeNodeDatum } = {};

//     // Create map of all nodes
//     people.forEach((person) => {
//         map[person.id] = {
//             name: person.firstName + " " + person.lastName,
//             attributes: {
//                 firstName: person.firstName,
//                 middleName: person.middleName,
//                 nickName: person.nickName,
//                 lastName: person.lastName,
//                 sex: person.sex,
//                 birthDate: person.birthDate.toISOString().split("T")[0],
//                 deathDate: person.deathDate ? person.deathDate.toISOString().split("T")[0] : null,
//             },
//             children: [],
//         };
//     });

//     let root: TreeNodeDatum | null = null;

//     // Establish parent-child relationships
//     people.forEach((person) => {
//         if (person.parent1Id && map[person.parent1Id]) {
//             map[person.parent1Id].children!.push(map[person.id]);
//         } else if (person.parent2Id && map[person.parent2Id]) {
//             map[person.parent2Id].children!.push(map[person.id]);
//         } else {
//             root = map[person.id];
//         }
//     });

//     return root!;
// }

// function FamilyTreeD3({ treeData }: FamilyTreeD3Props) {
//     const treeStructure = transformData(treeData.Person);

//     return (
//         <div style={{ width: "100%", height: "500px" }}>
//             <TreeComponent data={treeStructure} orientation="vertical" />
//         </div>
//     );
// }

// export default FamilyTreeD3;
