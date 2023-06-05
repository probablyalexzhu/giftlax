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
import { useReward } from "react-rewards";

export default function EventItem({ item }) {
    const eventName = item?.name;
    const dateCreated = item?.created;
    // console.log(rewardId);
    const { reward, isAnimating } = useReward(dateCreated, "confetti");
    return (
        <div>
            <Divider />
            <Flex spacing="10" padding="5">
                <Stack as="span" flex="1" textAlign="left">
                    <Text fontSize="lg">
                        <b>Event Name: {eventName}</b>
                    </Text>
                    <Text>Date Created: {dateCreated}</Text>
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
                        id={dateCreated}
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
