import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useCounters } from "../hooks/useCounters.hook"
import { CounterModel } from "../models/Counter.model"

export const Counter: FC<{counter: CounterModel}> = ({counter}) => {
    const { counters, setCounters } = useCounters()

    const updateCounter = (counter: CounterModel) => {
        fetch(`/api/counter/${counter.id}`, { method: 'POST', body: JSON.stringify(counter) }).catch(console.error)
        setCounters(counters.map(c => c.id === counter.id ? counter : c))
    }

    const onRemove = () => updateCounter({...counter, counter: counter.counter - 1})
    const onAdd = () => updateCounter({...counter, counter: counter.counter + 1})

    return (
        <Card maxW='sm'>
  <CardBody>
    <Flex mt='6' alignItems="center" justifyContent="space-between">
        <HStack spacing='3'  >
            <Heading size='md'>{counter.name}:</Heading>
            <Text fontSize='xl'>
                {counter.counter}/{counter.goal}
            </Text>
        </HStack>
        <ButtonGroup spacing='2'>
            <Button variant='outline' colorScheme='red' onClick={onRemove}>
                -
            </Button>
            <Button variant='solid' colorScheme='blue' onClick={onAdd}>
                +
            </Button>
        </ButtonGroup>
    </Flex>
  </CardBody>
</Card>
    )    
}