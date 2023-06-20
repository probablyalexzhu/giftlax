import {
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
    Input,
    useEditableControls,
    Flex,
    ButtonGroup,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

export default function NotesInput({ item, eventNotes, handleNotesChange }) {
    /* Here's a custom control */
    function EditableControls() {

        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent="left" size="sm">
                <IconButton
                    icon={<CheckIcon />}
                    {...getSubmitButtonProps()}
                    colorScheme="green"
                />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="left">
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    {...getEditButtonProps()}
                />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="left"
            defaultValue={item?.notes}
            fontSize="lg"
            isPreviewFocusable={false}
        >
            <EditablePreview />
            {/* Here is the custom input */}
            <Input
                as={EditableInput}
                value={eventNotes}
                onChange={handleNotesChange}
            />
            <EditableControls />
        </Editable>
    );
}
