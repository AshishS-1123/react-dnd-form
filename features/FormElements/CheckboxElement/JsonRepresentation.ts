import { KeyValuePair } from "../../../components/OptionContainer"

export type CheckboxElementData = {
    type: string,
    isRequired: boolean,
    label: string,
    options: KeyValuePair[],
}
