import { useCounters } from "../hooks/useCounters.hook";
import { Counter } from "./Counter"

export const Counters = () => {
    const {counters} = useCounters()
    
    return (<div>{counters.map(counter => <Counter key={counter.id} counter={counter} />)}</div>)

}