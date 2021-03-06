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
                textAlign: "center",
            },
            container2: {
                top: "20%",
                position: "absolute",
                textAlign: "left"
            },
            container3: {
                top: "30%",
                position: "absolute",
                textAlign: "right",
                right: "20%"
            },
            stretchtext: {
                letterSpacing: "0.5em",
                color: "#343a40",
                fontWeight: 400,
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontSize: "1.125rem",
                lineHeight: 1.1,
                
            },
            subtext: {
                fontWeight: "400 !important",
                marginBottom: "3rem !important",
                fontSize: "1.8rem"
            },
            heading1: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                marginBottom: "3rem !important",
                lineHeight: 1.1,
                textAlign: "center",
                fontSize: "5.5rem",
                textTransform: "uppercase !important",
            },
            heading2: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "6rem",
                lineHeight: 1.1,
                textAlign: "left"
            },
            heading3: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "4.5rem",
                lineHeight: 1.1,
                textAlign: "right"
            },
            heading4: {
                color:"#343a40",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase !important",
                marginBottom: "1rem !important",
                fontSize: "4.5rem",
                lineHeight: 1.1,
                textAlign: "right"
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
