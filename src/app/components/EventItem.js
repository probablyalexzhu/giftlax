import {
    Button,
    Flex,
    HStack,
    Stack,
    Text,
    Divider,
    Progress,
    Box,
    useToast,
} from "@chakra-ui/react";
import EventModalButton from "./EventModal.js";
import { useReward } from "react-rewards";
import GiftModal from "./GiftModal.js";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";

export default function EventItem({ item, isComplete }) {
    const eventName = item?.name;
    const date = item?.date;
    const gifts = item?.gifts;
    const notes = item?.notes;
    const recordId = item?.id.toString();

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
    let monthName = month[parseInt(monthString, 10) - 1];
    const dateString = `${monthName} ${parseInt(dayString, 10)}, ${yearString}`;
    // console.log(rewardId);
    let bg = "white";
    if (isComplete) {
        bg = "green.50";
    }

    return (
        <div>
            <Divider />
            <Flex spacing="10" padding="5" background={bg}>
                <Stack as="span" flex="1" textAlign="left">
                    <Text fontSize="lg">
                        Event Name: <b>{eventName}</b>
                    </Text>
                    <Text>Date: {dateString}</Text>
                    <Text>Gift List: {gifts}</Text>
                    <Text>Notes: {notes}</Text>
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
                    <GiftModal item={item} />
                    <EventModalButton item={item} />
                    <CompleteButton
                        recordId={recordId}
                        isComplete={isComplete}
                    />
                </HStack>
            </Flex>
        </div>
    );
}

function CompleteButton({ recordId, isComplete }) {
    const { reward, isAnimating } = useReward(recordId, "confetti");
    const toast = useToast();

    function handleComplete() {
        if (!isComplete) {
            toast({
                title: "Event completed!",
                description: "We've completed that event for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            reward();
        } else {
            toast({
                title: "Event uncompleted.",
                description: "We've uncompleted that event for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        setTimeout(() => {
            updateDatabaseCompletion();
        }, 3000);
    }

    async function updateDatabaseCompletion() {
        const pb = new PocketBase("http://127.0.0.1:8090");
        // console.log(eventDate);
        console.log(recordId.toString());
        let data = { completed: true };
        // edit data
        if (isComplete) {
            data = {
                completed: false,
            };
        }
        const record = await pb.collection("events").update(recordId, data);
        console.log("bazinga");
    }

    return isComplete ? (
        <Button
            rightIcon={<CloseIcon />}
            size="lg"
            colorScheme="red"
            variant="solid"
            disabled={isAnimating}
            onClick={handleComplete}
            id={recordId}
        >
            Mark Uncompleted
        </Button>
    ) : (
        <Button
            rightIcon={<CheckIcon />}
            size="lg"
            colorScheme="green"
            variant="outline"
            disabled={isAnimating}
            onClick={handleComplete}
            id={recordId}
        >
            Mark Completed
        </Button>
    );
}
