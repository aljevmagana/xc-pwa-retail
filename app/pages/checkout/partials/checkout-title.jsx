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
            paddingBottom="3rem" 
            letterSpacing="0.1em"
            textTransform="uppercase"
        >
            <FormattedMessage defaultMessage="Checkout" />
            {/* TODO: [l10n] implement using FormattedMessage instead, so that it will be able to be extracted
            (for example, see https://github.com/mobify/mobify-platform-sdks/blob/27b836e9e624aaa7f90e301033bd42654432d1c0/packages/pwa/app/pages/checkout/confirmation.js#L220)
            */}
            <Text 
                fontWeight="normal" 
                fontSize="1.215rem" 
                marginTop="2rem" 
                color="#868e96" 
                textTransform="none" 
                letterSpacing="0"
            >
                {/* You have {basket.itemAccumulatedCount} <FormattedPlural value={basket.itemAccumulatedCount} one=" Item" other=" Items" /> in your shopping cart */}
            </Text>
            
        </Text>
    )
}

export default CheckoutTitle
