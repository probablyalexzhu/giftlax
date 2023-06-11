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

export default function GiftModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [gifts, setGifts] = useState("");
    const handleGiftChange = (event) => setGifts(event.target.value);

    return (
        <>
            <Button size="lg" rightIcon=<CustomIcon /> onClick={onOpen}>
                Gifts
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <Box ml="40" mr="40" mt="20" mb="20">
                        <ModalHeader>Gifts</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Gift List</FormLabel>
                                <Input
                                    placeholder="Gift List"
                                    value={gifts}
                                    onChange={handleGiftChange}
                                />
                            </FormControl>
                            <Box>
                                <FormLabel mt={4}>Idea List</FormLabel>
                                <Textarea
                                    size="lg"
                                    placeholder="Here is a sample placeholder"
                                />
                            </Box>
                            <FormLabel mt={4}>GiftGen</FormLabel>
                            <div style={{width: '1400px', height: '800px', overflow: 'hidden'}}>
                                <iframe
                                    src="https://www.giftgen.co.uk/"
                                    title="iframe Example 1"
                                    scrolling="no"
                                    height = "800px"
                                    width = "1000px"
                                    style={{marginLeft: '-60px', marginTop: '-60px'}}
                                ></iframe>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="green"
                                mr={3}
                                onClick={onClose}
                            >
                                Update Gifts
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
