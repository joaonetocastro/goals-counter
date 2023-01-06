import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { FC } from "react"
import { CounterModel } from "../models/Counter.model"

export const Counter: FC<{counter: CounterModel}> = ({counter}) => {
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
            <Button variant='outline' colorScheme='red'>
                -
            </Button>
            <Button variant='solid' colorScheme='blue'>
                +
            </Button>
        </ButtonGroup>
    </Flex>
  </CardBody>
</Card>
    )    
}