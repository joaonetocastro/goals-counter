import { Grid, GridItem } from "@chakra-ui/react";
import { useCounters } from "../hooks/useCounters.hook";
import { AddCounter } from "./AddCounter";
import { Counter } from "./Counter"

export const Counters = () => {
    const {counters} = useCounters()
    
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem>
                {counters.map(counter => <Counter key={counter.id} counter={counter} />)}
            </GridItem>
            <GridItem>
                <AddCounter />
            </GridItem>
        </Grid>
    )
}