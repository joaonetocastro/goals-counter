import { AddIcon, CheckIcon, EditIcon, MinusIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Input, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useCounters } from "../hooks/useCounters.hook"
import { CounterModel } from "../models/Counter.model"

export const Counter: FC<{counter: CounterModel}> = ({counter}) => {
    const [editing, setEditing] = useState(false)
    const [counterName, setCounterName] = useState(counter.name)
    const [counterGoal, setCounterGoal] = useState(counter.goal)
    const { counters, setCounters } = useCounters()

    const updateCounter = (counter: CounterModel) => {
        fetch(`/api/counter/${counter.id}`, { method: 'POST', body: JSON.stringify(counter) }).catch(console.error)
        setCounters(counters.map(c => c.id === counter.id ? counter : c))
    }

    const onRemove = () => updateCounter({...counter, counter: counter.counter - 1})
    const onAdd = () => updateCounter({...counter, counter: counter.counter + 1})
    const onStartEditing = () => setEditing(true)
    const onFinishEditing = () => {
        updateCounter({...counter, name: counterName, goal: counterGoal})
        setEditing(false)
    }
    return (
        <Card w='md' backgroundColor="blackAlpha.900" color="whiteAlpha.900">
            <CardBody>
                {!editing && <>
                    <Flex alignItems="center" justifyContent="space-between">
                            <HStack spacing='3'  >
                                <Heading size='md'>{counter.name}:</Heading>
                                <Text fontSize='xl'>
                                    {counter.counter}/{counter.goal}
                                </Text>
                            </HStack>
                        <ButtonGroup spacing='2'>
                            <Button variant='outline' colorScheme='red' onClick={onRemove}>
                                <MinusIcon boxSize={3}/>
                            </Button>
                            <Button variant='solid' colorScheme='blue' onClick={onAdd}>
                                <AddIcon boxSize={3}/>
                            </Button>
                            <Button variant='outline' colorScheme='blue' onClick={onStartEditing}>
                                <EditIcon boxSize={3}/>
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </>}
                {editing && <>
                    <Flex alignItems="center" justifyContent="space-between">
                            <HStack spacing='3'  >
                                <Input backgroundColor="whiteAlpha.900" color="blackAlpha.900" value={counterName} onChange={e => setCounterName(e.target.value)}/>
                                <Input backgroundColor="whiteAlpha.900" color="blackAlpha.900" value={counterGoal} onChange={e => setCounterGoal(parseFloat(e.target.value))}/>
                                <Button variant='outline' colorScheme='green' onClick={onFinishEditing}>
                                    <CheckIcon boxSize={3}/>
                                </Button>
                            </HStack>
                    </Flex>
                </>}
            </CardBody>
        </Card>
    )    
}