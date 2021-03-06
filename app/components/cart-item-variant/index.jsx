/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {createContext, useContext} from 'react'
import PropTypes from 'prop-types'

/**
 * This component and associated context/hook provide a convenient wrapper
 * around a group of components used for rendering product variant details
 * from items in a customer basket or order.
 */

const CartItemVariantContext = createContext()

export const useCartItemVariant = () => {
    return useContext(CartItemVariantContext)
}

/**
 * The Provider component for rendering product item and variant detail.
 */
const CartItemVariant = ({variant, children}) => {
    return (
        <CartItemVariantContext.Provider value={variant}>
            {children}
        </CartItemVariantContext.Provider>
    )
}

CartItemVariant.propTypes = {
    variant: PropTypes.object,
    children: PropTypes.any
}

export default CartItemVariant
