"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Person } from "@prisma/client";

function FamilyTree({ data }: { data: any }) {
  // TODO specify the type of the data
  const svgRef = useRef(null);
  const width = 800; // Adjust as needed
  const height = 400; // Adjust as needed

  useEffect(() => {
    if (!data) {
      console.log("No data yet");
      return;
    } else {
      console.log("Data is here");
    }
    const svg = d3.select(svgRef.current);

    // Convert the data to hierarchical structure
    const root = d3.hierarchy(data[0], (d) => d.Person);

    const treeLayout = d3.tree().size([width, height]);
    const treeData = treeLayout(root);

    const linkGenerator = d3
      .linkHorizontal()
      .x((d) => (d as any).y)
      .y((d) => (d as any).x);

    const link = svg
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d: any) => linkGenerator(d));

    const node = svg
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle").attr("r", 5);

    node
      .append("text")
      .attr("dy", 3)
      .attr("x", (d) => (d.children ? -8 : 8))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d: any) => (d.data as Person).firstName);
  }, [data]);

  return (
    <div className="family-tree">
      <h2>Family Tree</h2>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default FamilyTree;
