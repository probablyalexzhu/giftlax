import {
    Text,
    HStack,
    Box,
    Avatar,
    Stack,
} from "@chakra-ui/react";

export default function ChatBox({ data }) {
    return data.map((item) => <MessageItem key={item?.id} item={item} />);
}

function MessageItem({ item }) {
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
    const dateParts = item?.created?.split("-");
    const monthString = dateParts[1].substr(0, 2);
    const dayString = dateParts[2].substr(0, 2);
    const timeString = dateParts[2].substr(3, 5);
    let monthName = month[parseInt(monthString, 10) - 1];
    const dateString = `${monthName} ${parseInt(dayString,10)} at ${timeString}`;

    return (
        <Box mt="5">
            <HStack>
                <Avatar
                    bg="orange.400"
                    size="md"
                    name={item?.name}
                    src={item?.avatarUrl}
                />{" "}
                <Stack>
                    <HStack spacing="20px">
                        <Text>
                            <b>{item?.name}</b>
                        </Text>
                        <Text color="grey">{dateString}</Text>
                    </HStack>
                    <Text>{item?.message}</Text>
                </Stack>
            </HStack>
        </Box>
    );
}
