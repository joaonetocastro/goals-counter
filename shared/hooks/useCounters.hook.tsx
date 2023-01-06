import React, { ReactNode, useEffect, useState } from "react";
import { CounterModel } from "../models/Counter.model";

interface CountersContext {
    counters: CounterModel[];
    setCounters: (counters: CounterModel[]) => void;
    fetchCounters(): Promise<void>;
}

const Context = React.createContext<CountersContext>({} as CountersContext);

export const CountersProvider: React.FC<{children?: ReactNode[] | ReactNode}> = ({ children }) => {
    const [counters, setCounters] = useState<CounterModel[]>([]);
    async function fetchCounters() {
        const response = await fetch('/api/counters')
        setCounters(await response.json() as CounterModel[])
    }
    useEffect(() => {   
        fetchCounters()
    }, [])
    
    return (
        <Context.Provider value={{ counters, setCounters, fetchCounters }}>
            {children}
        </Context.Provider>
    );
};

export const useCounters = () => React.useContext(Context);