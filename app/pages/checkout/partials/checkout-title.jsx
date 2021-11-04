/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {FormattedMessage, FormattedPlural} from 'react-intl'
import {Text} from '@chakra-ui/react'
import useBasket from '../../../commerce-api/hooks/useBasket'

const CheckoutTitle = () => {
    //const basket = useBasket()
    return (
        <Text 
            fontWeight="bold" 
            fontSize={['2.025rem', '2.025rem', '2.025rem', '4.05rem']} 
            textAlign="center" 
            paddingBottom={['1rem', '1rem', '3rem', '3rem']} 
            paddingTop= {['2rem', '2rem', '3rem', '3rem']}
            letterSpacing="0.1em"
            textTransform="uppercase"
        >
            <FormattedMessage defaultMessage="Checkout" />
            
        </Text>
    )
}

export default CheckoutTitle
