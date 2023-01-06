import { AddIcon, CheckIcon, EditIcon, MinusIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Input, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useCounters } from "../hooks/useCounters.hook"
import { CounterModel } from "../models/Counter.model"

export const Counter: FC<{counter: CounterModel}> = ({counter}) => {
    const [editing, setEditing] = useState(false)
    const [counterName, setCounterName] = useState(counter.name)
    const { counters, setCounters } = useCounters()

    const updateCounter = (counter: CounterModel) => {
        fetch(`/api/counter/${counter.id}`, { method: 'POST', body: JSON.stringify(counter) }).catch(console.error)
        setCounters(counters.map(c => c.id === counter.id ? counter : c))
    }

    const onRemove = () => updateCounter({...counter, counter: counter.counter - 1})
    const onAdd = () => updateCounter({...counter, counter: counter.counter + 1})
    const onStartEditing = () => setEditing(true)
    const onFinishEditing = () => {
        updateCounter({...counter, name: counterName})
        setEditing(false)
    }
    return (
        <Card w='md'>
            <CardBody>
                {!editing && <>
                    <Flex mt='6' alignItems="center" justifyContent="space-between">
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
                    <Flex mt='6' alignItems="center" justifyContent="space-between">
                            <HStack spacing='3'  >
                                <Input value={counterName} onChange={e => setCounterName(e.target.value)}/>
                            </HStack>
                        <ButtonGroup spacing='2'>
                            <Button variant='outline' colorScheme='green' onClick={onFinishEditing}>
                                <CheckIcon boxSize={3}/>
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </>}
            </CardBody>
        </Card>
    )    
}