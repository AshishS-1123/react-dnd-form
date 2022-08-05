import { actions, ActionType, State } from "./store";

export const reducer = (state: State, action: ActionType): State => {
    switch(action.type) {
        case actions.TRIGGER_CREATION_DIALOG:
            return {...state, creationDialogData: action.payload};
        case actions.ABORT_FORM_ELEMENT_CREATION:
            return {...state, creationDialogData: ""};
        case actions.ADD_FORM_ELEMENT:
            return state;
        case actions.REMOVE_FORM_ELEMENT:
            return state;
        default: return state;
    }
}
