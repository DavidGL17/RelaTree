"use client";

import { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Tree, TreeNodeDatum } from "react-d3-tree";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Tree as TreeType } from "@/types/Tree";

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

    const { data, isPending, error } = useFetch<TreeType[]>("http://localhost:3001/familyTree", "GET", session);

    if (data) {
        console.log(data[0].Person[0].deathDate);
    }
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
                                data[0].Person.map((item) => (
                                    <li key={item.id} className="mb-2">
                                        <Card>
                                            <CardBody>
                                                <p>
                                                    {item.firstName} {item.middleName} &quot;{item.nickName}&quot;{" "}
                                                    {item.lastName} {new Date(item.birthDate).getFullYear()}-
                                                    {item.deathDate && new Date(item.deathDate).getFullYear()}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </li>
                                ))}
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
