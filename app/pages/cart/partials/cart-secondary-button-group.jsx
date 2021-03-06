/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    ButtonGroup,
    Stack,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react'
import {SmallCloseIcon} from '@chakra-ui/icons'
import {defineMessage, FormattedMessage} from 'react-intl'
import {useCartItemVariant} from '../../../components/cart-item-variant'
import ConfirmationModal from '../../../components/confirmation-modal/index'
import {noop} from '../../../utils/utils'
import useCustomer from '../../../commerce-api/hooks/useCustomer'

export const REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG = {
    dialogTitle: defineMessage({defaultMessage: 'Remove Item?'}),
    confirmationMessage: defineMessage({
        defaultMessage: 'Are you sure you want to remove this item from your cart?'
    }),
    primaryActionLabel: defineMessage({defaultMessage: 'Yes, remove item'}),
    alternateActionLabel: defineMessage({defaultMessage: 'No, keep item'}),
    onPrimaryAction: noop
}

/**
 * Renders secondary actions on a product-item card in the form of a button group.
 * Represents other actions you want the user to perform with the product-item
 * (eg.: Remove or Edit or Add to wishlist for cart items)
 */
const CartSecondaryButtonGroup = ({
    onEditClick = noop,
    onRemoveItemClick = noop
}) => {
    const variant = useCartItemVariant()

    const customer = useCustomer()
    const modalProps = useDisclosure()

    const showRemoveItemConfirmation = () => {
        modalProps.onOpen()
    }

    const handleRemoveItem = async () => {
        onRemoveItemClick(variant)
    }

    return (
        <>
            <Stack
                alignItems='center'
            >
                <ButtonGroup spacing="6" alignItems="center">
                    <Button variant="link" size="sm" onClick={showRemoveItemConfirmation} color="black">
                        <Tooltip label="Remove from Cart" bg="gray.300" color="black">
                            <SmallCloseIcon w={4} h={4}/>
                        </Tooltip>
                    </Button>
                </ButtonGroup>
            </Stack>
            <ConfirmationModal
                {...REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG}
                onPrimaryAction={handleRemoveItem}
                {...modalProps}
            />
        </>
    )
}

CartSecondaryButtonGroup.propTypes = {
    onClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onAddToWishlistClick: PropTypes.func,
    onRemoveItemClick: PropTypes.func
}

export default CartSecondaryButtonGroup
