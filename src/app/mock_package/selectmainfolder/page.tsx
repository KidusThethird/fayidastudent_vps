"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function LayerOnePackageFolder() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/pacakgefolder/mockmain`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <h1 className="p-5 text-xl"></h1>
      <ul>
        {data.map((item: any) => (
          //   <li key={item?.id}>{item.folderName}</li>

          <div key={item?.id} className="w-5/6 mx-auto">
            <Link href={`/mock_package/selectsubfolder/${item?.folderName}`}>
              <div className="my-4 rounded-lg bg-primaryColor text-white hover:bg-opacity-80 cursor-pointer">
                <h1 className="px-10 py-2">{item?.folderName}</h1>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
