import React, { useReducer } from "react";
import { AllowedElements } from "../features/constants";
import FormElement from "../features/FormElements/FormElement";
import { reducer } from "./reducers";
import { actions, initialState, Actions } from "./store";
import { FormDataTypes } from "./store";

type FormDataContextType = {
    formData: FormElement[],
    creationDialogData: AllowedElements | "",
    triggerCreationDialog: (elementType: AllowedElements) => void,
    abortCreationDialog: () => void,
    addFormElement: () => void,
    removeFormElement: () => void,
}

export const FormDataContext = React.createContext<FormDataContextType>({} as FormDataContextType);

export interface Props {
    children?: JSX.Element
}

function Provider({ children}: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value: FormDataContextType = {
        formData: state.formData,
        creationDialogData: state.creationDialogData,
        triggerCreationDialog: (elementType: AllowedElements) => {
            dispatch({
                type: actions.TRIGGER_CREATION_DIALOG as Actions,
                payload: elementType
            })
        },
        abortCreationDialog: () => {
            dispatch({
                type: actions.ABORT_FORM_ELEMENT_CREATION as Actions,
                payload: {},
            });
        },
        addFormElement: () => {
            console.log("Called add");
        },
        removeFormElement: () => {},
    }

    return (
        <FormDataContext.Provider value={value}>
            {children}
        </FormDataContext.Provider>
    )
}

export default Provider;
