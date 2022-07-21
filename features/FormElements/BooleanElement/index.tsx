import React from "react";
import FormElement from "../FormElement";
import CreationDialog, { Props as CreationProps } from "./CreationDialog";
import PreviewComponent, { Props as PreviewProps } from "./PreviewComponent";
import DisplayName from "./DisplayName";

/**
 * BooleanElement will contain following data
 *   - type: "bool"
 *   - isRequired: false
 *   - label: ""
 */
class BooleanElement implements FormElement {
    name: string = "Boolean";
    icon: string = "some icon";

    isRequired: boolean = false;
    label: string = "";
    userResponse: boolean = false;

    // Register Callbacks
    creationDialogSubmitCallback: CreationProps["onSubmit"] = (inputQuestion: string, isRequired: boolean) => {
        this.label = inputQuestion;
        this.isRequired = isRequired;
    };

    previewSetResponseCallback: PreviewProps["setResponse"] = (userResponse: boolean) => {
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
            type: 'bool',
            isRequired: this.isRequired,
            label: this.label,
        }

        return JSON.stringify(jsonObject);
    }

    fromJSONString(jsonString: string): void {
        const parsedJson = JSON.parse(jsonString);

        // Make sure the correct properties exist.
        if (!parsedJson.hasOwnProperty("type") && parsedJson.type !== "bool") {
            throw new Error(`JSON string must have type property with value bool.`);
        }

        if (!parsedJson.hasOwnProperty("isRequired")) {
            throw new Error(`JSON string must have isRequired property.`);
        }

        if (!parsedJson.hasOwnProperty("label") && typeof parsedJson.label == 'string' && parsedJson.label != "") {
            throw new Error(`JSON string must have label property containing a non-empty string`);
        }

        this.isRequired = parsedJson.isRequired;
        this.label = parsedJson.label;
    }
}

export default BooleanElement