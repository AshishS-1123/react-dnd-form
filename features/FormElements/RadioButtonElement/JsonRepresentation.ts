import { KeyValuePair } from "../../../components/OptionContainer"

export type RadioElementData = {
    type: string,
    isRequired: boolean,
    label: string,
    options: KeyValuePair[],
}
