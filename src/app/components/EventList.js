import {
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Stack,
    Text,
    Divider,
    Progress,
    Box,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FiGift } from "react-icons/fi";
import EventModalButton from "./EventModal.js";
import { useState, useEffect } from "react";
import { useReward } from 'react-rewards';

export default function EventList() {
    return (
        <div>
            <EventItem sectionNumber={0} rewardId = "b1"/>
            <EventItem sectionNumber={1} rewardId = "b2"/>
            <EventItem sectionNumber={2} rewardId = "b3"/>
        </div>
    );
}

function EventItem(props) {
    const sectionNumber = props.sectionNumber;
    const rewardId = props.rewardId;
    // console.log(rewardId);
    const {reward, isAnimating} = useReward(rewardId, 'confetti');
    return (
        <div>
            <Divider />
            <Flex spacing="10" padding="5">
                <Stack as="span" flex="1" textAlign="left">
                    <Text fontSize="lg">
                        <b>Section {sectionNumber} title</b>
                    </Text>
                    <Text>Gifts Prepared: </Text>
                    <Box width="25%">
                        <Stack>
                            <Text fontSize="sm">Money spent: </Text>
                            <Progress
                                hasStripe
                                colorScheme="green"
                                value={64}
                            />
                        </Stack>
                    </Box>
                </Stack>
                <HStack>
                    <GiftButton text={"Gifts"} />
                    <EventModalButton />
                    <IconButton
                        icon={<CheckIcon />}
                        colorScheme="green"
                        variant="outline"
                        id={rewardId}
                        disabled={isAnimating}
                        onClick={reward}
                    />
                </HStack>
            </Flex>
        </div>
    );
}

function GiftButton(props) {
    const { text } = props;
    return (
        <Button size="lg" rightIcon=<CustomIcon />>
            {text}
        </Button>
    );
}

function TextButton(props) {
    const { text } = props;
    return <Button size="md">{text}</Button>;
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
