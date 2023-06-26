import { useState } from "react";
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
    FormLabel,
    useToast,
    Icon,
    Input,
} from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";
import PocketBase from "pocketbase";
import GiftListInput from "./GiftListInput.js";
import NotesInput from "./NotesInput.js";
import RandomGift from "./RandomGift.js"

export default function GiftModal({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventList, setList] = useState(item?.gifts);
    const handleListChange = (event) => setList(event.target.value);
    const [eventSpent, setSpent] = useState(item?.spent);
    const handleSpentChange = (event) => setSpent(event.target.value);
    const [eventNotes, setNotes] = useState(item?.notes);
    const handleNotesChange = (event) => setNotes(event.target.value);
    const recordId = item?.id;
    const toast = useToast();

    function handleUpdate(eventList, eventNotes) {
        toast({
            title: "Gifts updated.",
            description: "We updated those gifts for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        updateDatabaseEvent(eventList, eventNotes);
    }

    async function updateDatabaseEvent(eventList, eventNotes) {

        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        // console.log(eventDate);
        // edit data
        const data = {
            gifts: eventList,
            notes: eventNotes,
            spent: eventSpent,
        };
        const record = await pb.collection("events").update(recordId, data);
    }

    return (
        <>
            <Button size="lg" rightIcon=<CustomIcon /> onClick={onOpen}>
                Gifts
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gifts</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Gift List</FormLabel>
                        <GiftListInput
                            item={item}
                            eventList={eventList}
                            handleListChange={handleListChange}
                        />
                        <FormLabel mt={4}>Notes</FormLabel>
                        <NotesInput
                            item={item}
                            eventNotes={eventNotes}
                            handleNotesChange={handleNotesChange}
                        />
                        {item?.budget != 0 ? (
                            <div>
                                <FormLabel mt={4}>Spent</FormLabel>
                                <Input
                                    placeholder="Spent"
                                    value={eventSpent}
                                    onChange={handleSpentChange}
                                />
                            </div>
                        ) : (<div></div>)}
                        <FormLabel mt={4}>Idea Generator</FormLabel>
                        <RandomGift/>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={() => handleUpdate(eventList, eventNotes)}
                        >
                            Update Gifts
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
