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
    Spacer,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";
export default function EditModalButton({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    // const finalRef = useRef(null);

    const [eventName, setName] = useState(item?.name);
    const handleNameChange = (event) => setName(event.target.value);
    const [eventBudget, setBudget] = useState();
    const handleBudgetChange = (event) => setBudget(event.target.value);
    const [eventDate, setDate] = useState(item?.date.substring(0, item?.date.indexOf(' ')));
    const handleDateChange = (event) => setDate(event.target.value);
    const toast = useToast();
    const recordId = item?.id;

    function handleUpdate(eventName, eventDate) {
        toast({
            title: "Event updated.",
            description: "We updated that event for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        updateDatabaseEvent(eventName, eventDate);
    }

    async function updateDatabaseEvent(eventName, eventDate) {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        const data = {
            name: eventName,
            date: eventDate,
            budget: eventBudget,
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
                    aria-label="Edit"
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
                            <Input
                                placeholder="Budget (optional)"
                                value={eventBudget}
                                onChange={handleBudgetChange}/>
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
                        <DeleteAlertDialog item={item} />
                        <Spacer />
                        <Tooltip
                            label="Required fields missing"
                            isDisabled={!isNameError && !isDateError}
                        >
                            <Button
                                isDisabled={isNameError || isDateError}
                                colorScheme="green"
                                mr={3}
                                onClick={() =>
                                    handleUpdate(eventName, eventDate)
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

function DeleteAlertDialog({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();
    const recordId = item?.id;

    function handleDelete(recordId) {
        toast({
            title: "Event deleted.",
            description: "We deleted that event for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        deleteDatabaseEvent(recordId);
    }

    async function deleteDatabaseEvent(recordId) {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        // console.log("delete item id: " + recordId);
        // delete data
        await pb.collection("events").delete(recordId);
    }

    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Delete Event
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Event
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => handleDelete(recordId)}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
