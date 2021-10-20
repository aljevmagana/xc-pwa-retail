/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {Fragment} from 'react'
import {FormattedMessage} from 'react-intl'
import {Flex, Button, Icon} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {AmexIcon, MastercardIcon, PaypalIcon, VisaIcon} from '../../../components/icons'
import {
    FaApplePay
} from 'react-icons/fa';
import Link from '../../../components/link'

const CartCta = () => {
    return (
        <Fragment>
            <Button
                as={Link}
                to="/checkout"
                width={['95%', '95%', '95%', '100%']}
                marginTop={[6, 6, 2, 2]}
                mb={4}
                rightIcon={<ChevronRightIcon w={6} h={6}/>}
                variant="outline"
                background="#343a40"
                color="white"
                fontSize="0.7875rem"
                    _hover={{
                        background: "black",
                        color: "white",
                      }}
            >
                <FormattedMessage defaultMessage="Proceed to Checkout" />
            </Button>
            <Flex justify={'center'}>
                <VisaIcon height={8} width={10} mr={2} />
                <MastercardIcon height={8} width={10} mr={2} />
                <AmexIcon height={8} width={10} mr={2} />
                <Icon as={FaApplePay} height={8} width={10} mr={2} viewBox="0 0 38 22"/>
                <PaypalIcon height={8} width={10} mr={2} />
            </Flex>
        </Fragment>
    )
}

export default CartCta
