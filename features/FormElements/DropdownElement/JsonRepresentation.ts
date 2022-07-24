import { KeyValuePair } from "../../../components/OptionContainer"

export type DropdownElementData = {
    type: string,
    isRequired: boolean,
    label: string,
    options: KeyValuePair[],
}
