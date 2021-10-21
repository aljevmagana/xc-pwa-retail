/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState} from 'react'
import {
    Box,
    Flex,
    Radio,
    RadioGroup,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Spacer,
    Stack,
    Text,
    useMultiStyleConfig
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PriceRangeRefinements = ({ filter, toggleFilter, selectedFilters }) => {

    const style = useMultiStyleConfig('PriceRangeSlider');

    let priceRangeList = [];
    let priceString = "";
    let min = 0;
    let max = 0; 
    let selectedPriceList = [];

    if(filter.priceRefine.price){
        let tempPriceString = filter.priceRefine.price.replace("(","").replace(")","").replace("..",",")
        tempPriceString = tempPriceString.split(',').map(Number)
        let iterator = tempPriceString.values();
        for (const value of iterator) {
            selectedPriceList.push(value);
        }       
    } else {
        priceString = filter.values.replace("(","").replace(")","").replace("..",",")
        priceString = priceString.split(',').map(Number)
        let iterator = priceString.values();
        for (const value of iterator) {
            selectedPriceList.push(value);
        }
    }


    priceString = filter.values.replace("(","").replace(")","").replace("..",",")
    priceString = priceString.split(',').map(Number)
    let iterator = priceString.values();
    for (const value of iterator) {
        priceRangeList.push(value);
    }
    
    min = Math.min(...priceRangeList);
    max = Math.max(...priceRangeList);
    

    const [minPrice, setMinPrice] = useState(min);
    const [maxPrice, setMaxPrice] = useState(max);
    const [selectedPrice, setSelectedPrice] = useState(selectedPriceList);
    const [selectMinText, setSelectMinText] = useState(selectedPriceList[0]);
    const [selectMaxText, setSelectMaxText] = useState(selectedPriceList[1]);

    const setMinMax = (val) => {

        setSelectedPrice(val);

        setSelectMinText(val[0])
        setSelectMaxText(val[1])

        let priceStringValue = `(`+`${val[0]}`+ `..` + `${val[1]}`+`)`;
        let priceStringLabel = `$`+`${val[0]}`+ `-` + `$${val[1]}`;

        let priceRefinementDetail = {
            hitCount:1,
            label:priceStringLabel,
            value:[priceStringValue]
        }

        console.log("selectedFilters");
        console.log(selectedFilters);
        console.log(selectedFilters?.includes(priceStringValue));
        toggleFilter(
            priceRefinementDetail,
            'price',
            selectedFilters?.includes(priceStringValue),
            false
        )
    }


    return (
        <Box>
            <Box>
                <RangeSlider
                    key={selectedPrice}
                    aria-label={["min", "max"]}
                    defaultValue={selectedPrice}
                    /* value={selectedPrice} */
                    min={minPrice}
                    max={maxPrice}
                    onChangeEnd={(val) => setMinMax(val)}
                    colorScheme={"#212529"}
                >
                    <RangeSliderTrack {...style.rangeslidertrack}>
                        <RangeSliderFilledTrack {...style.rangesliderfilledtrack} />
                    </RangeSliderTrack>
                    <RangeSliderThumb  index={0}  {...style.rangesliderthumb}/>
                    <RangeSliderThumb index={1} {...style.rangesliderthumb} />
                </RangeSlider>
            </Box>
            <Flex marginTop={'1rem'}>
                <Box>
                    <Text {...style.rangesliderpricetext}>From ${selectMinText}.00 </Text>
                </Box>
                <Spacer />
                <Box>
                    <Text {...style.rangesliderpricetext}>To ${selectMaxText}.00 </Text>
                </Box>
            </Flex>
        </Box>
    )
}

PriceRangeRefinements.propTypes = {
    filter: PropTypes.object,
    toggleFilter: PropTypes.func,
    selectedFilters: PropTypes.any
}

export default PriceRangeRefinements
