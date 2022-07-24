import { actions, ActionType, State } from "./store";

export const reducer = (state: State, action: ActionType): State => {
    switch(action.type) {
        case actions.TRIGGER_CREATION_DIALOG:
            const newState = {...state, creationDialogData: action.payload};
            return newState;
        case actions.ADD_FORM_ELEMENT:
            return state;
        case actions.REMOVE_FORM_ELEMENT:
            return state;
        default: return state;
    }
}
