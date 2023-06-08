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
import { useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";
export default function EventModalButton({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const [eventName, setName] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const [eventDate, setDate] = useState("");
    const handleDateChange = (event) => setDate(event.target.value);
    const toast = useToast();
    const recordId = item?.id;

    function handleUpdate(eventName, eventDate) {
        toast({
            title: "Event updated.",
            description: "We've updated that event for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
        updateDatabaseEvent(eventName, eventDate);
    }

    async function updateDatabaseEvent(eventName, eventDate) {
        const pb = new PocketBase("http://127.0.0.1:8090");
        console.log(eventDate);
        // example edit data
        const data = {
            name: eventName,
            gifts: "test",
            date: eventDate,
        };
        const record = await pb.collection("events").update(recordId, data);
    }

    const isNameError = eventName === "";
    const isDateError = eventDate === "";

    return (
        <>
            <Box padding="5">
                <Button
                    size="lg"
                    rightIcon={<EditIcon />}
                    aria-label="New Event"
                    onClick={onOpen}
                >
                    Edit
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Event</ModalHeader>
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
                            <Input placeholder="Budget (optional)" />
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
                        <Checkbox colorScheme="green" mt={4}>
                            Recurs Annually
                        </Checkbox>
                    </ModalBody>

                    <ModalFooter>
                        <Tooltip label="Required fields missing" isDisabled={!isNameError && !isDateError}>
                            <Button
                                isDisabled={isNameError || isDateError}
                                colorScheme="green"
                                mr={3}
                                onClick={() =>
                                    handleUpdate(
                                        eventName,
                                        eventDate
                                    )
                                }
                            >
                                Update Event
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
