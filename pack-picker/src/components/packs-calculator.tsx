import { Button, Input } from "antd";
import React, {useState} from "react";
import Results from "./results";

const PacksCalculator: React.FC = (props) => { 

    const [response, setResponse] = useState(null);

    const [packs, setPacks] = useState([ 0 ]);

    var orderSize = 0;


    const addPack = () => {
        setPacks(packs => [...packs, 0]);
        console.log(packs);
    };

    const updatePacks = (index : number, value : string) =>  {
        packs[index] = Number(value)
        //setPacks(packs => [...packs]);
        console.log(packs);
    };

    const removePack = (index : number) =>  {
        packs.splice(index, 1);

        setPacks(packs => [...packs]);
        console.log(packs);
    };

    const updateOrderSize = (value: string) => {
        orderSize = Number(value)
    };

    const calculatePacks = () => {
        // do something in here with an api
        const xhr = new XMLHttpRequest();
        const params = {
            "numberOfItems" : orderSize,
            "packSizes" : packs
        };

        console.log(JSON.stringify(params));
        xhr.open('POST', 'http://localhost:8080/packs');

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                setResponse(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(params));
    };

  
    return (
        <div className="flex flex-col justify-center items-center pt-10 font-montserrat"> 

            <div className="flex flex-col w-10/12 lg:w-6/12"> 

                <div>Pack sizes:</div> 

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    { packs.map(function(value, index) {
                        return ( <div className="grid grid-cols-3 px-3 bg-slate-200 py-2 rounded" key={value + "" + Math.floor(Math.random() * 90 + 10)}>
                                <Input className="col-span-2" defaultValue={value} onChange={(e) => updatePacks(index, e.target.value)}/>
                                
                                <Button className="justify-self-end" disabled={!(packs.length > 1)} onClick={(e) => removePack(index)}> X</Button>
                            </div>
                        )
                        }
                    )}
                </div>   

                <div className="my-2">
                    <Button onClick={addPack}>Add pack</Button>
                </div>
            </div>

            <div className="flex flex-col w-10/12 lg:w-6/12 pt-4">
                <div>Order size:</div> 

                <Input className="w-50" onChange={(e) => updateOrderSize(e.target.value)}/>
            </div>

            <Button className="mt-8" onClick={calculatePacks}>Calculate Packs</Button>

            { response !== null && 
                <Results packs={response}/>
            }   
        </div>
    );
}

// export default observer(Packs);
export default PacksCalculator;