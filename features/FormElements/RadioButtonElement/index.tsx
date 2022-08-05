import React from "react";
import FormElement from "../FormElement";
import CreationDialog, { Props as CreationProps } from "./CreationDialog";
import PreviewComponent, { Props as PreviewProps } from "./PreviewComponent";
import DisplayName from "./DisplayName";
import { KeyValuePair } from "../../../components/OptionContainer";

/**
 * RadioElement will contain following data
 *   - type: "radio"
 *   - isRequired: false
 *   - label: ""
 */
class RadioElement implements FormElement {
    name: string = "radio";
    icon: string = "some icon";

    isRequired: boolean = false;
    label: string = "";
    userResponse: string = "";
    options: KeyValuePair[] = [];
    error: string = "";

    // Register Callbacks
    creationDialogSubmitCallback: CreationProps["onSubmit"] = (inputQuestion: string, options: KeyValuePair[]) => {
        this.label = inputQuestion;
        this.options = options;
    };

    previewSetResponseCallback: PreviewProps["setResponse"] = (selectedOption: string) => {
        this.userResponse = selectedOption;
    }

    constructor() {}

    getElementCreationDialog(): JSX.Element {
        return <CreationDialog onSubmit={this.creationDialogSubmitCallback}/>;
    }

    getElementPreviewComponent(): JSX.Element {
        return (
            <PreviewComponent 
                inputLabel={this.label} 
                options={this.options}
                isRequired={this.isRequired} 
                externalError={this.error}
                setResponse={this.previewSetResponseCallback}
            />
        );
    }

    toJSONString(): string {
        const jsonObject = {
            type: 'radio',
            isRequired: this.isRequired,
            label: this.label,
            options: this.options,
        }

        return JSON.stringify(jsonObject);
    }

    fromJSONString(jsonString: string): void {
        const parsedJson = JSON.parse(jsonString);

        // Make sure the correct properties exist.
        if (!parsedJson.hasOwnProperty("type") && parsedJson.type !== "radio") {
            throw new Error(`JSON string must have type property with value radio.`);
        }

        if (!parsedJson.hasOwnProperty("isRequired")) {
            throw new Error(`JSON string must have isRequired property.`);
        }

        if (!parsedJson.hasOwnProperty("label") && typeof parsedJson.label == 'string' && parsedJson.label != "") {
            throw new Error(`JSON string must have label property containing a non-empty string`);
        }

        if(!parsedJson.hasOwnProperty("options")) {
            throw new Error(`JSON string must have array of options`);
        }

        this.isRequired = parsedJson.isRequired;
        this.label = parsedJson.label;
        this.options = parsedJson.options;
    }
}

export default RadioElement