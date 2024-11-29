"use client";

import { Tree, TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Person, Tree as TreeType } from "@/types/Tree";
import PersonCard from "@/components/PersonCard";
import FamilyTree from "@/components/Tree";
import { Button, useDisclosure } from "@nextui-org/react";
import EditPersonModal from "@/components/EditPersonModal";

const treeData: TreeNodeDatum = {
    name: "Parent Node",
    children: [
        {
            name: "Child Node 1",
            __rd3t: {
                id: "Child Node 1",
                depth: 1,
                collapsed: false,
            },
        },
        {
            name: "Child Node 2",
            __rd3t: {
                id: "Child Node 2",
                depth: 1,
                collapsed: false,
            },
        },
    ],
    __rd3t: {
        id: "Parent Node",
        depth: 0,
        collapsed: false,
    },
};

function TreePage() {
    const { theme } = useTheme();
    const {
        isOpen: isAddPersonModalOpen,
        onOpen: onAddPersonModalOpen,
        onClose: onAddPersonModalClose,
    } = useDisclosure();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/tree");
        },
    });

    const { data, isPending, error } = useFetch<TreeType[]>("http://localhost:3001/familyTree", "GET", session);
    // here we assume that we will always take the first tree, need to add some logic in case there are none, or many trees

    const handleAddPerson = () => {
        console.log("Opening add person modal");
        onAddPersonModalOpen();
    };

    const onAddPerson = (newPerson: Person) => {
        console.log("Adding person");

        if (session && data) {
            console.log(newPerson);
            const familyTreeId = data[0].id; // TODO change here
            const abortCont = new AbortController(); //abort fetch
            const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${session.token}`,
            };
            const settings: RequestInit = {
                signal: abortCont.signal,
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    ...newPerson,
                    familyTreeId: familyTreeId,
                }),
            };

            fetch("http://localhost:3001/person/", settings)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not add the person");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Person added:", data);
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    } else {
                        console.log(err);
                    }
                });

            return () => abortCont.abort();
        }
    };

    return (
        <>
            {/* TODO update error display */}
            <div>{error && <p>{error}</p>}</div>
            <div className="flex h-screen">
                <div className="w-1/4 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold mb-4">Item List</h2>
                        <Button onPress={handleAddPerson}>Add person</Button>
                    </div>
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {data &&
                                session &&
                                data[0].Person.map((item) => {
                                    return (
                                        <li key={item.id} className="mb-2">
                                            <PersonCard person={item} tree={data[0]} session={session} />
                                        </li>
                                    );
                                })}
                        </ul>
                    )}
                </div>
                {/* Main Content */}
                <div className="flex-1 p-4">
                    <h1 className="text-2xl font-bold mb-4">Tree Graph</h1>
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        data && (
                            <div className="border p-4" style={{ height: "500px" }}>
                                <FamilyTree treeData={data[0]} theme={theme} />
                            </div>
                        )
                    )}
                </div>
            </div>
            <EditPersonModal
                person={null}
                isOpen={isAddPersonModalOpen}
                onClose={onAddPersonModalClose}
                onSave={onAddPerson}
            />
        </>
    );
}

export default TreePage;
