/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
        },

        
        parallaxsection: {
            container:{
            },
            container2_1:{
                position: "relative",  
            },
            container2: {
                top: "20%",
                position: "absolute",
            },
            container3: {
                top: "30%",
                position: "absolute",
                textAlign: "right",
                right: "20%",
                paddingLeft:".5rem"
            },
            container3mobile: {
                top: "30%",
                position: "absolute",
                left: "5%",
            },
            stretchtext: {
                letterSpacing: "0.5em",
                color: "whitesmoke",
                fontWeight: 400,
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontSize: "1.125rem",
                lineHeight: 1.1,
                
            },
            subtext: {
                fontWeight: "400 !important",
                fontSize: "1.8rem"
            },
            heading1: {
                color:"whitesmoke",
                letterSpacing: "0.1em",
                fontWeight: 700,
                lineHeight: 1.1,
                textTransform: "uppercase !important",
                whiteSpace:"normal"
            },
            heading1mobile: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                marginBottom: "3rem !important",
                lineHeight: 1.1,

                textTransform: "uppercase !important",
                whiteSpace:"normal"
            },
            heading2: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                lineHeight: 1.1,

            },
            heading2mobile: {
                color:"#212529",
                letterSpacing: "0.1em",
                fontWeight: 700,
                fontSize:"3.5rem",
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                lineHeight: 1.1,

            },
            heading3: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "4.5rem",
                lineHeight: 1.1,

            },
            heading3mobile: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                lineHeight: 1.1,
            },
            heading4: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "4.5rem",
                lineHeight: 1.1,
            },
            heading4mobile: {
                color:"#212529",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "2.5rem",
                lineHeight: 1.1,
            },
            buttonoutline: {
                background: "transparent !importnat",
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: ".3em",
                padding: "0.6rem 0.75rem",
                fontSize: "0.6875rem",
                lineHeight: 1.5,
                borderRadius: "0",
                color: "#343a40",
                borderColor: "#343a40",
                display: "inline-block",
                textAlign: "center",
                verticalAlign: "middle",
                userSelect: "none",
                backgroundColor: "transparent",
                border: "1px solid #343a40",
                transition:"color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                _hover: {
                    color: "#fff",
                    backgroundColor: "#343a40",
                    borderColor: "#343a40",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                },
                _active: {
                    color: "#fff",
                    backgroundColor: "#343a40",
                    borderColor: "#343a40",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                }
            },
            buttonsolid: {
                background: "transparent !importnat",
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: ".3em",
                padding: "0.6rem 0.75rem",
                fontSize: "0.6875rem",
                lineHeight: 1.5,
                borderRadius: "0",
                color: "#fff",
                borderColor: "#343a40",
                display: "inline-block",
                textAlign: "left",
                verticalAlign: "middle",
                userSelect: "none",
                backgroundColor: "#343a40",
                border: "1px solid #343a40",
                transition:"color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                _hover: {
                    color: "#fff",
                    backgroundColor: "#23272b",
                    borderColor: "#1d2124",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                },
                _active: {
                    color: "#fff",
                    backgroundColor: "#23272b",
                    borderColor: "#1d2124",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                }
            },
            buttonsolidlarge: {
                background: "transparent !importnat",
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: ".3em",
                padding: "0.6rem 0.75rem",
                fontSize: "0.6875rem",
                height: "68px",
                lineHeight: 1.5,
                borderRadius: "0",
                color: "#fff",
                borderColor: "#343a40",
                display: "inline-block",
                textAlign: "left",
                verticalAlign: "middle",
                userSelect: "none",
                backgroundColor: "#343a40",
                border: "1px solid #343a40",
                transition:"color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                _hover: {
                    color: "#fff",
                    backgroundColor: "#23272b",
                    borderColor: "#1d2124",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                },
                _active: {
                    color: "#fff",
                    backgroundColor: "#23272b",
                    borderColor: "#1d2124",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: ".3em",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.6875rem",
                    lineHeight: 1.5,
                    borderRadius: "0",
                    textAlign: "center",
                    verticalAlign: "middle",
                    transition:
                      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
                }
            }
        }

    },
    variants: {

    },
    parts: ['container', 'parallaxsection']
}
