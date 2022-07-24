import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import PreviewComponent from "../PreviewComponent";

const LABEL_TEXT = "Some question here.";
const RADIO_CONTAINER_TEST_ID = "element-radio-preview-radioContainer";
const ERROR_NODE_TEST_ID = "element-radio-preview-errorNode";
const OPTIONS = [
    {key: "Key 1", value: "Value 1"},
    {key: "Key 2", value: "Value 2"},
]

describe("Radio Element : Preview Component", () => {
    it("should contain all necessary DOM elements", () => {
        // DOM elements that must be present are- 
        // Label, Radio buttons with corresponding labels, P Tag.
        render(
            <PreviewComponent 
                inputLabel={LABEL_TEXT} 
                options={OPTIONS} 
                isRequired={true} 
                externalError=""
                setResponse={() => {}}
            />
        );

        const labelQuestionNode = screen.getByText(LABEL_TEXT);
        expect(labelQuestionNode).toBeInTheDocument();

        const radioNodes = screen.getAllByTestId(RADIO_CONTAINER_TEST_ID);
        expect(radioNodes).toHaveLength(OPTIONS.length);

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
    });

    it("should contain as many radio buttons as number of options provided", () => {
        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError=""
                setResponse={() => {}}
            />
        );

        const radioNodes = screen.getAllByTestId(RADIO_CONTAINER_TEST_ID);

        // Check the number of radio buttons that are present.
        expect(radioNodes).toHaveLength(OPTIONS.length);

        OPTIONS.forEach(option => {
            // Check that the label with given key is present.
            const radioNode = screen.getByRole("radio", {name: option.key});
            expect(radioNode).toBeInTheDocument();
        });
    });

    it("should display error when passed externally", () => {
        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError="External Error"
                setResponse={() => {}}
            />
        );

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
        expect(errorNode).toHaveTextContent("External Error");
    })

    it("should trigger callback with correct parameters when all inputs are correct", async () => {
        const user = userEvent.setup();
        const setResponseCallback = jest.fn();

        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError="External Error"
                setResponse={setResponseCallback}
            />
        );

        // Select the first radio button node. 
        const firstRadioNode = screen.getByRole("radio", {name: OPTIONS[0].key});

        // Click on the first radio.
        await user.click(firstRadioNode);

        // Ensure callback is triggered correctly.
        expect(setResponseCallback).toHaveBeenCalledWith(OPTIONS[0].value);
    })
});
