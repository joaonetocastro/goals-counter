import { AddIcon, CheckIcon, EditIcon, MinusIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Input, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useCounters } from "../hooks/useCounters.hook"
import { CounterModel } from "../models/Counter.model"

export const AddCounter: FC = () => {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState(0)
    const { counters, setCounters, fetchCounters } = useCounters()

    const addCounter = async () => {
        await fetch(`/api/counter`, { method: 'POST', body: JSON.stringify({
            name,
            counter: 0,
            goal
        })}).catch(console.error)
        setCounters([...counters])
    }

    const onSubmit = async () => {
        await addCounter()
        fetchCounters()
        setName('')
        setGoal(0)
    }
    return (
        <Card w='md' backgroundColor="blackAlpha.900" color="whiteAlpha.900">
            <CardBody>
                <Flex alignItems="center" justifyContent="space-between">
                    <HStack spacing='3'>
                        <Input placeholder="Nome" backgroundColor="whiteAlpha.900" color="blackAlpha.900" value={name} onChange={e => setName(e.target.value)}/>
                        <Input placeholder="Quantidade" backgroundColor="whiteAlpha.900" color="blackAlpha.900" type="number" value={goal} onChange={e => setGoal(parseFloat(e.target.value))}/>
                        <Button variant='outline' colorScheme='green' onClick={onSubmit}>
                            <CheckIcon boxSize={3}/>
                        </Button>
                    </HStack>
                </Flex>
            </CardBody>
        </Card>
    )    
}