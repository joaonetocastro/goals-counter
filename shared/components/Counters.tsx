import { SimpleGrid, GridItem } from "@chakra-ui/react";
import { useCounters } from "../hooks/useCounters.hook";
import { AddCounter } from "./AddCounter";
import { Counter } from "./Counter"

export const Counters = () => {
    const {counters} = useCounters()
    
    return (
        <SimpleGrid columns={2} gap={4}>
                {counters.map(counter => 
                <GridItem key={counter.id}>
                    <Counter counter={counter} />
                </GridItem>
                )}
            <GridItem>
                <AddCounter />
            </GridItem>
        </SimpleGrid>
    )
}