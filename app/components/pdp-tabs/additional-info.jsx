import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Image,
    Input,
    Textarea,
    Text,
    Select,
    SimpleGrid,
    Stack,
    StackDivider,
    VStack,
    HStack
} from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'

const AdditionalInfo = ({product}) => {
    const temporaryAddInfo={
        productNum:"1234567890",
        packaging:"N/A",
        weight:"2 Pounds",
        dimensions:"1x1x1",
        origin:"Taiwan",
        manufacturer:"Enigma Industries",
        releaseDate:"2021",
        materials:"Cotton"
    }
    return(
        <Stack direction={["column", "row"]} fontSize="0.7875rem">
        <Table>
            <Tr>
                <Td>PRODUCT #</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.productNum}</Td>
            </Tr>
            <Tr>
                <Td >AVAILABLE PACKAGING</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.packaging}</Td>
            </Tr>
            <Tr>
                <Td>WEIGHT</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.weight}</Td>
            </Tr>
            <Tr>
                <Td >DIMENSIONS</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.dimensions}</Td>
            </Tr>
        </Table>
        <Table>
            <Tr>
                <Td>ORIGIN</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.origin}</Td>
            </Tr>
            <Tr>
                <Td >MANUFACTURER</Td>
                <Td color="#868e96" textAlign={["right", "left"]}>{temporaryAddInfo.manufacturer}</Td>
            </Tr>
            <Tr>
                <Td >RELEASE DATE</Td>
                <Td color="#868e96"  textAlign={["right", "left"]}>{temporaryAddInfo.releaseDate}</Td>
            </Tr>
            <Tr>
                <Td >MATERIALS</Td>
                <Td color="#868e96" textAlign={["right", "left"]} >{temporaryAddInfo.materials}</Td>
            </Tr>
        </Table>
    </Stack>
    )
}

export default AdditionalInfo;