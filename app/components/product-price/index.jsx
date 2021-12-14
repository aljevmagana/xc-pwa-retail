import React from 'react'
import {useIntl} from 'react-intl'
import {DEFAULT_CURRENCY} from '../../constants'
import {
    HStack,
    Text,
    Skeleton 
} from '@chakra-ui/react'

const productPrice = ({pricebook, price, currency, fontSize}) => {
    const intl = useIntl()
    let minOriginalPrice = pricebook[0]?.minPrice || pricebook[0]?.price;
    let minDiscountPrice = pricebook[1]?.minPrice || pricebook[1]?.price;
    let noSale = false;
    if (minOriginalPrice === minDiscountPrice){
        noSale = true;
    }
  
    return(
        <Skeleton isLoaded={price}>
            <HStack>
                <Text fontWeight="300" fontSize={fontSize[0]} aria-label="price" align="left">
                    {intl.formatNumber(minDiscountPrice, {
                        style: 'currency',
                        currency: currency || DEFAULT_CURRENCY
                    })} 
                </Text>
                {!noSale && 
                <Text as="s" fontSize={fontSize[1]} align="left" color="gray">
                    {intl.formatNumber((minOriginalPrice), {
                        style: 'currency',
                        currency: currency || DEFAULT_CURRENCY
                    })}
                </Text>
                }            
            </HStack>
        </Skeleton>
    )
}

export default productPrice