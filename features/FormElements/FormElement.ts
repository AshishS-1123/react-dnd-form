import React from "react";

interface FormElement {
    name: string;
    icon: string;

    /*
     * This method is responsible for returning a dialog component.
     * This dialog is responsible for creating the form element.
     * This includes stuff like getting label for elements, various parameters, etc.
     */
    getElementCreationDialog(): JSX.Element;

    /*
     * This method is responsible for returning the preview element of dialog.
     * Based on the label, and various parameters given to the form element, 
     * this component is responsible for rendering the component.
     * It is used in 2 different places- the PreviewContainer and the form that users will be filling.
     */
    getElementPreviewComponent(): JSX.Element;

    /*
     * This component uses the name and icon to display this form element in the ElementContainer.
     */
    getDisplayComponent(): JSX.Element;

    /*
     * Converts the form element and its data into JSON format. This JSON format is sent to the
     * backend and stored in the database.
     */
    toJSONString(): string;

    /*
     * This method creates a new form element using the JSON string provided.
     * It uses the data received from the backend to create the form element.
     */
    fromJSONString(jsonString: string): void;
}

export default FormElement;