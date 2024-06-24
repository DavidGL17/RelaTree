"use client";

import { Tree, TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Tree as TreeType } from "@/types/Tree";
import PersonCard from "@/components/PersonCard";
import FamilyTree from "@/components/Tree";

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

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/tree");
        },
    });

    const { data, isPending, error } = useFetch<TreeType[]>("http://localhost:3001/familyTree", "GET", session);
    // here we assume that we will always take the first tree, need to add some logic in case there are none, or many trees

    return (
        <>
            {/* TODO update error display */}
            <div>{error && <p>{error}</p>}</div>
            <div className="flex h-screen">
                <div className="w-1/4 p-4">
                    <h2 className="text-xl font-bold mb-4">Item List</h2>
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {data &&
                                data[0].Person.map((item) => {
                                    return (
                                        <li key={item.id} className="mb-2">
                                            <PersonCard person={item} tree={data[0]} />
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
        </>
    );
}

export default TreePage;
