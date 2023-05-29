import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";

import GreenButton from "./GreenButton.js";

export default function accordion() {
    return (
        <Accordion>
            <CustomAccordionItem sectionNumber={0} />
            <CustomAccordionItem sectionNumber={1} />
            <CustomAccordionItem sectionNumber={2} />
        </Accordion>
    );
}

function CustomAccordionItem(props) {
    const { sectionNumber } = props;
    return (
        <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                            Section { sectionNumber } title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <GreenButton />
                </h2>
                <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
            </AccordionItem>
    )
}