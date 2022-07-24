import React from "react";
import FormElement from "../FormElement";
import CreationDialog, { Props as CreationProps, allowedInputTypes, allowedInputs } from "./CreationDialog";
import PreviewComponent, { Props as PreviewProps } from "./PreviewComponent";
import DisplayName from "./DisplayName";
import { KeyValuePair } from "../../../components/OptionContainer";

/**
 * InputElement will contain following data
 *   - type: "input"
 *   - isRequired: false
 *   - label: ""
 *   - inputType: "text"
 */
class InputElement implements FormElement {
    name: string = "Input";
    icon: string = "some icon";

    isRequired: boolean = false;
    label: string = "";
    userResponse: string = "";
    inputType: allowedInputTypes = "text";

    // Register Callbacks
    creationDialogSubmitCallback: CreationProps["onSubmit"] = (inputQuestion: string, isRequired: boolean, inputType: allowedInputTypes) => {
        this.label = inputQuestion;
        this.isRequired = isRequired;
        this.inputType = inputType;
    };

    previewSetResponseCallback: PreviewProps["setResponse"] = (userResponse: string) => {
        this.userResponse = userResponse;
    }

    constructor() {}

    getElementCreationDialog(): JSX.Element {
        return <CreationDialog onSubmit={this.creationDialogSubmitCallback}/>;
    }

    getElementPreviewComponent(): JSX.Element {
        return (
            <PreviewComponent 
                inputLabel={this.label}
                inputType={this.inputType}
                isRequired={this.isRequired}
                setResponse={this.previewSetResponseCallback}
            />
        );
    }

    getDisplayComponent(): JSX.Element {
        return <DisplayName displayName={this.name} />;
    }

    toJSONString(): string {
        const jsonObject = {
            type: 'input',
            isRequired: this.isRequired,
            label: this.label,
            inputType: this.inputType,
        }

        return JSON.stringify(jsonObject);
    }

    fromJSONString(jsonString: string): void {
        const parsedJson = JSON.parse(jsonString);

        // Make sure the correct properties exist.
        if (!parsedJson.hasOwnProperty("type") && parsedJson.type !== "input") {
            throw new Error(`JSON string must have type property with value input.`);
        }

        if (!parsedJson.hasOwnProperty("isRequired")) {
            throw new Error(`JSON string must have isRequired property.`);
        }

        if (!parsedJson.hasOwnProperty("label") && typeof parsedJson.label === 'string' && parsedJson.label !== "") {
            throw new Error(`JSON string must have label property containing a non-empty string`);
        }

        if(
            !parsedJson.hasOwnProperty("inputType") && 
            typeof parsedJson.inputType === 'string' && 
            allowedInputs.findIndex(parsedJson) !== -1
        ) {
            throw new Error(`JSON string must have input type`);
        }

        this.isRequired = parsedJson.isRequired;
        this.label = parsedJson.label;
        this.inputType = parsedJson.inputType;
    }
}

export default InputElement