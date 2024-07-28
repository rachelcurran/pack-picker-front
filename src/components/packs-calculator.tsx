import { Button, Input } from "antd";
import React, {useState} from "react";
import Results from "./results";

const PacksCalculator: React.FC = () => { 

    const [response, setResponse] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [packs, setPacks] = useState([ 250, 500, 1000, 2000, 5000 ]);
    const [orderSize, setOrderSize] = useState (null as number | null)
    const [isLoading, setLoading] = useState(false);

    const [disablePacks, setDisablePacks] = useState(false)

    const addPack = () => {
        setPacks(packs => [...packs, 0]);
    };

    const updatePacks = (value : string, index : number) =>  {
        packs[index] = Number(value)
        setPacks(packs => [...packs]);
    };

    const removePack = (index : number) =>  {
        packs.splice(index, 1);
        setPacks(packs => [...packs]);
    };

    const updateOrderSize = (value: string) => {
        setOrderSize(Number(value))
    };

    const calculatePacks = () => {
        setResponse(null);
        setLoading(true);
        setDisablePacks(true);
        const xhr = new XMLHttpRequest();
        const params = {
            "numberOfItems" : orderSize,
            "packSizes" : packs
        };

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

    const reset = () => {
        setPacks([ 250, 500, 1000, 2000, 5000 ]);
        setDisablePacks(false);
        setOrderSize(null as number | null)
    }

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
                    { packs.map((value, index) => {
                        return ( <div className="grid grid-cols-3 px-3 bg-slate-200 py-2 rounded" key={value + "" + Math.floor(Math.random() * 90 + 10)}>
                                <Input className="col-span-2" defaultValue={value} disabled={disablePacks} onBlur={(e) => updatePacks(e.target.value, index)}/>
                                
                                <Button className="justify-self-end" disabled={(!(packs.length > 2)) || disablePacks} onClick={(e) => removePack(index)}> X</Button>
                            </div>
                        )
                        }
                    )}
                </div>   
                <div className="my-2">
                    <Button onClick={addPack} disabled={disablePacks}>Add pack</Button>
                </div>
            </div>

            <div className="flex flex-col w-10/12 lg:w-6/12 pt-4">
                <div>Order size:</div> 

                <Input className="w-50" value={orderSize ?? ""} onChange={(e) => updateOrderSize(e.target.value)}/>
            </div>

            <Button className="mt-8" onClick={calculatePacks} loading={isLoading}>Calculate Packs</Button>

            <Button className="mt-4" onClick={reset}>Reset</Button>

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