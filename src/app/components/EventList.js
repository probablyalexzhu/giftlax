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
    Box
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FiGift } from "react-icons/fi";

export default function EventList() {
    return (
        <div>
            <EventItem sectionNumber={0} />
            <EventItem sectionNumber={1} />
            <EventItem sectionNumber={2} />
        </div>
    );
}

function EventItem(props) {
    const { sectionNumber } = props;
    return (
        <div>
            <Divider />
            <Flex spacing="10" padding="5">
                <Stack as="span" flex="1" textAlign="left">
                    <Text fontSize="lg">
                        <b>Section {sectionNumber} title</b>
                    </Text>
                    <Text>Gifts Prepared: </Text>
                    <Box width='25%'>
                        <Stack>
                            <Text fontSize='sm'>Money spent: </Text>
                            <Progress hasStripe colorScheme='green' value={64}/>
                        </Stack>
                    </Box>
                </Stack>
                <HStack>
                    <GiftButton text={"Gifts"} />
                    <TextButton text={"Edit"} />
                    <IconButton icon={<CheckIcon />} colorScheme='green' variant='outline'/>
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
    return <Icon as={FiGift}/>;
}
