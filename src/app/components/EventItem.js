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
    const date = item?.date;
    const gifts = item?.gifts;
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dateParts = date.split("-");
    const monthString = dateParts[1].substr(0, 2);
    const dayString = dateParts[2].substr(0, 2);
    const yearString = dateParts[0].substr(0, 4);
    let monthName = month[parseInt(monthString, 10)];
    const dateString = `${monthName} ${parseInt(dayString, 10)}, ${yearString}`;
    // console.log(rewardId);
    const { reward, isAnimating } = useReward(date, "confetti");
    return (
        <div>
            <Divider />
            <Flex spacing="10" padding="5">
                <Stack as="span" flex="1" textAlign="left">
                    <Text fontSize="lg">
                        <b>Event Name: {eventName}</b>
                    </Text>
                    <Text>Date: {dateString}</Text>
                    <Text>Gifts Prepared: {gifts}</Text>
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
                        disabled={isAnimating}
                        onClick={reward}
                        id={date} // tells confetti which button to appear at
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