/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {Stack, Table, Td, Tr} from '@chakra-ui/react'

const AdditionalInfo = ({product}) => {
    const temporaryAddInfo = {
        packaging: 'N/A',
        weight: '2 Pounds',
        dimensions: '1x1x1',
        origin: 'USA',
        manufacturer: 'Enigma Industries',
        releaseDate: '2021',
        materials: 'Cotton'
    }
    console.log(product)
    return (
        <Stack direction={['column', 'row']} fontSize="0.7875rem">
            <Table>
                <Tr>
                    <Td>PRODUCT #</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.master.masterId}
                    </Td>
                </Tr>
                <Tr>
                    <Td>AVAILABLE PACKAGING</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {' '}
                        {temporaryAddInfo.packaging}{' '}
                    </Td>
                </Tr>
                <Tr>
                    <Td>WEIGHT</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.c_unitWeight || temporaryAddInfo.weight}
                    </Td>
                </Tr>
                <Tr>
                    <Td>DIMENSIONS</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {temporaryAddInfo.dimensions}
                    </Td>
                </Tr>
            </Table>
            <Table>
                <Tr>
                    <Td>ORIGIN</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.c_manufacturerLocation || temporaryAddInfo.origin}
                    </Td>
                </Tr>
                <Tr>
                    <Td>MANUFACTURER</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.manufacturerName || temporaryAddInfo.manufacturer}
                    </Td>
                </Tr>
                <Tr>
                    <Td>RELEASE DATE</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.c_releaseDate || temporaryAddInfo.releaseDate}
                    </Td>
                </Tr>
                <Tr>
                    <Td>MATERIALS</Td>
                    <Td color="#868e96" textAlign={['right', 'left']}>
                        {product.c_materials || temporaryAddInfo.materials}
                    </Td>
                </Tr>
            </Table>
        </Stack>
    )
}

export default AdditionalInfo
