import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {
    Text, 
} from '@chakra-ui/react'

const DiscountCallout = ({discount}) => {
    const remainingToDiscount = discount.conditionThreshold - discount.merchandiseTotal;
    return(
        <Text fontSize="0.9rem">
            Add an additonal ${remainingToDiscount.toFixed(2)} worth of items and receive {discount.promotionLink.calloutMsg}
        </Text>
    )
}

export default DiscountCallout