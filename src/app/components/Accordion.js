import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import GreenButton from "./GreenButton.js";
import { FiGift } from 'react-icons/fi'

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
            <Flex spacing="10" padding="5">  
                
                <Box as="span" flex="1" textAlign="left">
                    Section { sectionNumber } title
                </Box>
                <HStack>
                    <MyButton text={"Gifts"} />
                    <MyButton2 text={"Edit"}/>
                    <IconButton icon={<CheckIcon/>}/>
                </HStack>
            </Flex>
        </AccordionItem>
    )
}

function MyButton(props) {
    const { text } = props;
    return (
        <Button size='lg' rightIcon=<CustomIcon /> >{ text }</Button>
    )
}

function MyButton2(props) {
    const { text } = props;
    return (
        <Button size='md' >{ text }</Button>
    )
}

function CustomIcon() {
    return <Icon as={FiGift} />
  }