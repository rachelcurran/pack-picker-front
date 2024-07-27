import React from 'react';

interface ResultProps { 
  packs : number[];
}

const Results: React.FC <ResultProps>= (props) => { 
  const { 
    packs
  } = props; 

  var counts: any[] = [];

  packs.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  return (
    <div className="flex flex-col w-10/12 lg:w-6/12 my-8 bg-slate-200 rounded">
      <div className="p-4 m-4 bg-white">

        <div>Required Packs :</div> 

        <div>
            {
              counts.map(function(count, packSize)  {
                return <div>{count} x {packSize}</div>
              })
            }
        </div>
      </div>
      
    </div>
  );
}

export default Results;