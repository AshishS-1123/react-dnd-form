import { allowedInputTypes } from "./CreationDialog"

export type InputElementData = {
    type: string,
    isRequired: boolean,
    label: string,
    inputType: allowedInputTypes,
}
