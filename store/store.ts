import { AllowedElements } from "../features/constants";
import { BooleanElementData } from "../features/FormElements/BooleanElement/JsonRepresentation";
import { CheckboxElementData } from "../features/FormElements/CheckboxElement/JsonRepresentation";
import { DropdownElementData } from "../features/FormElements/DropdownElement/JsonRepresentation";
import { InputElementData } from "../features/FormElements/InputElement/JsonRepresentation";
import { RadioElementData } from "../features/FormElements/RadioButtonElement/JsonRepresentation";

export type FormDataTypes = BooleanElementData | CheckboxElementData | DropdownElementData | InputElementData | RadioElementData;

export type State = {
    formData: FormDataTypes[],
    creationDialogData: AllowedElements | "",
}

export const initialState: State = {
    formData: [],
    creationDialogData: "",
}

export const actions = {
    TRIGGER_CREATION_DIALOG: "TRIGGER_CREATION_DIALOG",
    ADD_FORM_ELEMENT: "ADD_FORM_ELEMENT",
    REMOVE_FORM_ELEMENT: "REMOVE_FORM_ELEMENT",
}

export type Actions = "ADD_FORM_ELEMENTS" | "REMOVE_FORM_ELEMENTS" | "TRIGGER_CREATION_DIALOG";

export type ActionType = {
    type: Actions,
    payload: any,
}
