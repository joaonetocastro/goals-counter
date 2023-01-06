import React, { ReactNode, useEffect, useState } from "react";
import { CounterModel } from "../models/Counter.model";

interface CountersContext {
    counters: CounterModel[];
    setCounters: (counters: CounterModel[]) => void;
}

const Context = React.createContext<CountersContext>({} as CountersContext);

export const CountersProvider: React.FC<{children?: ReactNode[] | ReactNode}> = ({ children }) => {
    const [counters, setCounters] = useState<CounterModel[]>([]);

    useEffect(() => {
        async function fetchCounters() {
            const response = await fetch('http://localhost:3000/api/counters')
            setCounters(await response.json() as CounterModel[])
        }

        fetchCounters()
    }, [])
    
    return (
        <Context.Provider value={{ counters, setCounters }}>
            {children}
        </Context.Provider>
    );
};

export const useCounters = () => React.useContext(Context);