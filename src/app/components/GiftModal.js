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
    AlertDialogCloseButton,
    Icon,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiGift } from "react-icons/fi";
import EditableTextInput from "./Editable.js"

export default function GiftModal({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [gifts, setGifts] = useState("");
    const handleGiftChange = (event) => setGifts(event.target.value);

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
                        <EditableTextInput item={item}/>
                    </ModalBody>
                    <ModalFooter/>
                </ModalContent>
            </Modal>
        </>
    );
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
