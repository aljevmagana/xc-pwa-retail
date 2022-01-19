/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, useIntl} from 'react-intl'
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay} from '@chakra-ui/react'
import ProductView from '../../../partials/product-view'
import {useProductViewModal} from '../../../hooks/use-product-view-modal'

//Hooks
import {useVariant} from '../../../hooks'
import useBasket from '../../../commerce-api/hooks/useBasket'
import useEinstein from '../../../commerce-api/hooks/useEinstein'

//Constants
import {useToast} from '../../../hooks/use-toast'
import {API_ERROR_MESSAGE, customerProductListTypes} from '../../../constants'

/**
 * A Modal that contains Product View
 */
const ProductViewModal = ({product, isOpen, onClose, ...props}) => {
    const productViewModalData = useProductViewModal(product)
    const {formatMessage} = useIntl()
    const variant = useVariant(product)
    const basket = useBasket()
    const showToast = useToast()
    const einstein = useEinstein()

    useEffect(() => {
        if (product) {
            einstein.sendViewProduct(product)
        }
    }, [product])

    // function that handles quick Add to Cart, quick ATC are disabled if product are more than 1
    const handleAddToCart = async (product) => {
        const quantity = 1
        try {
            console.log("product orderable")
            console.log(product?.orderable);
            if (!product?.orderable || !quantity) return
            // The basket accepts an array of `ProductItems`, so lets create a single
            // item array to add to the basket.
            console.log("creating productItems")
            console.log(product)
            const productItems = [
                {
                    productId: product.productId,
                    quantity,
                    price: product.price
                }
            ]

            console.log("productItems")
            console.log(productItems)
            basket.addItemToBasket(productItems)
            window.scrollTo(0, 0);
        } catch (error) {
            showError(error)
        }
    }

    const showError = (error) => {
        console.log(error)
        showToast({
            title: formatMessage(
                {defaultMessage: '{errorMessage}'},
                {errorMessage: API_ERROR_MESSAGE}
            ),
            status: 'error'
        })
    }

    return (
        <Modal data-testid={'sf-product-view-modal'} size="4xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={8} bg="white" paddingBottom={6} marginTop={6}>
                    <ProductView
                        showFullLink={true}
                        imageSize="sm"
                        addToCart={(variant, quantity) => handleAddToCart(variant, quantity)}
                        product={productViewModalData.product}
                        isLoading={productViewModalData.isFetching}
                        {...props}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

ProductViewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object,
    isLoading: PropTypes.bool,
    actionButtons: PropTypes.node,
    onModalClose: PropTypes.func
}

export default ProductViewModal
