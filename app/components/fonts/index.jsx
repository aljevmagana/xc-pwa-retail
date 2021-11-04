/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import { Global } from '@emotion/react'


const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'HK Grotesk';
        font-weight: 300;
        font-style: normal;
        src: url('../../static/fonts/hkgrotesk-light-webfont.woff2') format('woff2'), url('../../static/fonts/hkgrotesk-light-webfont.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'HK Grotesk';
        font-style: normal;
        font-weight: normal;
        src: url('../../static/fonts/hkgrotesk-regular-webfont.woff2') format('woff2'), url('../../static/fonts/hkgrotesk-regular-webfont.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'HK Grotesk';
        font-style: normal;
        font-weight: bold;
        src: url('../../static/fonts/hkgrotesk-bold-webfont.woff2') format('woff2'), url('../../static/fonts/hkgrotesk-regular-webfont.woff') format('woff');
      }
      `}
  />
)

export default Fonts