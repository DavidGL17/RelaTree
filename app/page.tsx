"use client";

import FamilyTree from "./components/FamilyTree";
import { useEffect, useState } from "react";

export default function Home() {
  const [familyTreeData, setFamilyTreeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/");
        const data = await response.json();
        console.log(data);
        setFamilyTreeData(data);
      } catch (error) {
        console.error("Error fetching family tree data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FamilyTree data={familyTreeData} />
    </main>
  );
}
