"use client";

import { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Tree, TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";

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

function MainPage() {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/tree");
        },
    });

    const { data, isPending, error } = useFetch<any>("http://localhost:3001/familyTree", "GET", session);

    const user = session?.user;

    console.log("User", user);

    const renderNodeWithCustomStyles = (rd3tProps: { nodeDatum: any }) => {
        const { nodeDatum } = rd3tProps;
        const textColor = theme === "dark" ? "#ffffff" : "#000000";

        return (
            <g>
                <circle r="15" fill="#ffcc00"></circle>
                <text fill={textColor} x="20" dy=".35em" fontSize="12">
                    {nodeDatum.name}
                </text>
            </g>
        );
    };

    return (
        // display data and error
        <>
            <div>
                {isPending && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            <div className="flex h-screen">
                {/* Side Panel */}
                <div className="w-1/4 p-4">
                    <h2 className="text-xl font-bold mb-4">Item List</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {/* {items.map((item) => (
                            <li key={item.id} className="mb-2">
                                <Card>
                                    <CardBody>
                                        <p>{item.name}</p>
                                    </CardBody>
                                </Card>
                            </li>
                        ))} */}
                        </ul>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4">
                    <h1 className="text-2xl font-bold mb-4">Tree Graph</h1>
                    <div className="border p-4" style={{ height: "500px" }}>
                        <Tree data={treeData} renderCustomNodeElement={renderNodeWithCustomStyles} />{" "}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
