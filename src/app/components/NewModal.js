import { useRef, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Box,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";

export default function GreenButton(email) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const emailString = JSON.parse(JSON.stringify(email)).email;
    const [eventName, setName] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const [eventBudget, setBudget] = useState();
    const handleBudgetChange = (event) => setBudget(event.target.value);
    const [eventDate, setDate] = useState("");
    const handleDateChange = (event) => setDate(event.target.value);
    const toast = useToast();

    function handleSubmit(emailString, eventName, eventDate) {
        toast({
            title: "Event added.",
            description: "We added that event for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        createDatabaseEvent(emailString, eventName, eventDate);
    }

    async function createDatabaseEvent(emailString, eventName, eventDate) {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        // console.log(eventDate);
        // create data
        const data = {
            name: eventName,
            date: eventDate,
            email: emailString,
            budget: eventBudget,
        };

        const record = await pb.collection("events").create(data);
    }

    const isNameError = eventName === "";
    const isDateError = eventDate === "";

    return (
        <>
            <Box padding="5">
                <Button
                    size="lg"
                    colorScheme="green"
                    rightIcon={<AddIcon />}
                    aria-label="New Event"
                    onClick={onOpen}
                >
                    New Event
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired isInvalid={isNameError}>
                            <FormLabel>Event name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Name"
                                value={eventName}
                                onChange={handleNameChange}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Budget</FormLabel>
                            <Input
                                placeholder="Budget (optional)"
                                value={eventBudget}
                                onChange={handleBudgetChange}
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired isInvalid={isDateError}>
                            <FormLabel>Date</FormLabel>
                            <Input
                                placeholder="Select Date"
                                size="md"
                                type="date"
                                value={eventDate}
                                onChange={handleDateChange}
                            />
                        </FormControl>
                        {/* <Checkbox colorScheme="green" mt={4}>
                            Recurs Annually
                        </Checkbox> */}
                    </ModalBody>

                    <ModalFooter>
                        <Tooltip label="Required fields missing" isDisabled={!isNameError && !isDateError}>
                            <Button
                                isDisabled={isNameError || isDateError}
                                colorScheme="green"
                                mr={3}
                                onClick={() =>
                                    handleSubmit(
                                        emailString,
                                        eventName,
                                        eventDate
                                    )
                                }
                            >
                                Save Event
                            </Button>
                        </Tooltip>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
