import React, { useContext } from "react";
import { FormDataContext } from "../../store/Provider";
import { AllowedElements } from "../constants";
import FormElement from "../FormElements/FormElement";
import BooleanElement from "../FormElements/BooleanElement";
import CheckboxElement from "../FormElements/CheckboxElement";
import DropDownElement from "../FormElements/DropdownElement";
import InputElement from "../FormElements/InputElement";
import RadioElement from "../FormElements/RadioButtonElement";


// The PreviewContainer will have 2 components- One for displaying all created components,
// Other for displaying the dialogs.
// When ElementContainer triggers creation of a dialog using FormDataContext.creationDialogData,
// The Dialog component should be shown. Filling data here and submitting the form will create 
// a new FormElement objects with all the necessary information.

export interface Props {

}

const DialogFromData = (creationDialogData: AllowedElements | ""): FormElement | null => {
    switch(creationDialogData) {
        case "boolean": return new BooleanElement();
        case "checkbox": return new CheckboxElement();
        case "dropdown": return new DropDownElement();
        case "input": return new InputElement();
        case "radio": return new RadioElement();
        default: return null;
    }
}

function PreviewContainer(props: Props): JSX.Element {
    const { creationDialogData } = useContext(FormDataContext);

    return (
        <>
            { DialogFromData(creationDialogData)?.getElementCreationDialog() }
        </>
    );
}

export default PreviewContainer;
