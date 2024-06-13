"use client";
import { Tree } from "@/types/Tree";
import { Tree as TreeComponent, TreeNodeDatum } from "react-d3-tree";

const tmpTreeData: TreeNodeDatum = {
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

function FamilyTree({ treeData, theme }: { treeData: Tree; theme: string | undefined }) {
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
    // TODO add proper data processing and tree

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <TreeComponent
                data={tmpTreeData}
                renderCustomNodeElement={renderNodeWithCustomStyles}
                orientation="vertical"
            />{" "}
        </div>
    );
}

export default FamilyTree;
