// "use client";


import React, { FC, ReactElement, useEffect, useState } from 'react'

import ProjectIndexRow from "./ProjectIndexRow";
import IndexEntry from '@/types/IndexEntry';


async function getProjectIndex(): Promise<IndexEntry[]> {
    
    console.log("heeerre: " + process.env.SERVER);

    const res = await fetch(`${process.env.SERVER}/api/projects`, {method: "GET"});
    if (res.ok) {
        const data = await res.json();
        
        const index: IndexEntry[] = [];
        for (let i = 0; i < data.projects.length; i++) {
            index.push(new IndexEntry().deserialize(data.projects[i]));
        }
        return index;
    }

    return [];
}


//================================   COMPONENT    ============================


type ProjectTableProps = {

}


const ProjectTable: FC<ProjectTableProps> = async ({ }): Promise<ReactElement> => {
    const index = await getProjectIndex();


    console.log(index);

    function buildProjectTable() {
        if (index) {
            return index.map((entry) => (
                // <ProjectIndexRow entry={entry} key={entry.shortCode} />
                <div key={entry.shortCode}>test</div>
            ))
        }
        return null
    }

  return (
      <div id="projectTable" className=" mt-9 text-xs text-white">
        <table className="w-full border-separate border-spacing-0">
            <thead>
                <tr className="">
                    <th className="px-1 pr-2 pb-4 text-left">Year</th>
                    <th className="px-1 pb-4 text-left">Title</th>
                    {/* <th className="px-1">Categories</th>
                    <th className=" pl-1 pr-0">Affiliation</th> */}
                </tr>
            </thead>
              <tbody>
                  {buildProjectTable()}
                {/* {index ? index!.map((entry) => (
                    <ProjectIndexRow entry={entry} key={entry.shortCode} /> 
                )) : null}  */}
            </tbody>
        </table>
    </div>
  )
}

export default ProjectTable