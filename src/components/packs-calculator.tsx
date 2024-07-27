import { Button, Input } from "antd";
import React, {useState} from "react";
import Results from "./results";

const PacksCalculator: React.FC = (props) => { 

    const [response, setResponse] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [packs, setPacks] = useState([ 0 ]);
    const [isLoading, setLoading] = useState(false);

    var orderSize = 0;

    const addPack = () => {
        setPacks(packs => [...packs, 0]);
    };

    const updatePacks = (index : number, value : string) =>  {
        packs[index] = Number(value)
    };

    const removePack = (index : number) =>  {
        packs.splice(index, 1);
        setPacks(packs => [...packs]);
    };

    const updateOrderSize = (value: string) => {
        orderSize = Number(value)
    };

    const calculatePacks = () => {
        setResponse(null);
        setLoading(true);
        const xhr = new XMLHttpRequest();
        const params = {
            "numberOfItems" : orderSize,
            "packSizes" : packs
        };

        console.log(JSON.stringify(params));
        xhr.open('POST', 'https://whispering-hollows-05368-f071ed37f19c.herokuapp.com/packs');

        xhr.onload = function() {
            setLoading(false);
            if (xhr.status === 200) {
                setHasError(false);
                setResponse(JSON.parse(xhr.responseText));
            }else{
                setHasError(true);
                setErrorMessage("Please make sure the pack sizes and order size are populated.")
            }
        };

        xhr.addEventListener("error", handleError);
        xhr.send(JSON.stringify(params));
    };

    const handleError = () =>{
        setLoading(false);
        setHasError(true);
        setErrorMessage("Sorry, something's gone wrong. Please try again.")
    }

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

            <Button className="mt-8" onClick={calculatePacks} loading={isLoading}>Calculate Packs</Button>

            { response !== null && 
                <Results packs={response}/>
            }   

            { hasError && 
                <div className="flex flex-col w-10/12 lg:w-6/12 my-8 bg-slate-200 rounded">
                    <div className="p-4 m-4 bg-white">
                        {errorMessage}
                    </div>
                </div>
        
            }   
        </div>
    );
}

export default PacksCalculator;