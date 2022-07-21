import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import PreviewComponent from "../PreviewComponent";

const PREVIEW_LABEL_TEXT = "Enter a boolean value";
const TOGGLE_BUTTON_ID = "switch-container-id";

describe("Boolean Element : Preview Component", () => {
    it("should contain all necessary dom elements", () => {
        // The DOM elements that must be present are a label for the question and a toggle element.
        // However, since ToggleButton is not a standard input, a Label may not be present.
        // So, search for text content instead.
        render(
            <PreviewComponent 
                inputLabel={PREVIEW_LABEL_TEXT} 
                isRequired={false} 
                setResponse={() => {}}
            />
        );

        const labelNode = screen.getByText(PREVIEW_LABEL_TEXT);
        const toggleButtonNode = screen.getByTestId(TOGGLE_BUTTON_ID);

        expect(labelNode).toBeInTheDocument();
        expect(toggleButtonNode).toBeInTheDocument();
    });

    it("should trigger callback when user changes input", async () => {
        const user = userEvent.setup();
        const setResponseCallback = jest.fn();

        render(
            <PreviewComponent 
                inputLabel={PREVIEW_LABEL_TEXT} 
                isRequired={false} 
                setResponse={setResponseCallback}
            />
        );

        const toggleButtonNode = screen.getByTestId(TOGGLE_BUTTON_ID);

        // First clicking the toggle button should trigger callback with true as switch state.
        await user.click(toggleButtonNode);
        expect(setResponseCallback).toBeCalledWith(true);

        // Clicking the toggle button second time should trigger callback with false as switch state.
        await user.click(toggleButtonNode);
        expect(setResponseCallback).toBeCalledWith(false);
    });
});
