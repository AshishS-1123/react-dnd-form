import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
import ToggleButton from "..";

const SWITCH_CONTAINER_ID = "switch-container-id";
const SWITCH_OFF_TEST_ID = "switch-off-element";
const SWITCH_ON_TEST_ID = "switch-on-element";
const SWITCH_HIDDEN_ELEMENT_CLASS = "toggle-button-hidden";

describe("Components: ToggleButton", () => {
    it('should contain 2 elements to be shown alternatively based on toggle state', () => {
        render(<ToggleButton isOn={true} toggleState={() => {}}/>);

        const OffNode = screen.getByTestId(SWITCH_OFF_TEST_ID);
        expect(OffNode).toBeInTheDocument();

        const OnNode = screen.getByTestId(SWITCH_ON_TEST_ID);
        expect(OnNode).toBeInTheDocument();
    });

    it('should display first element when value of switch is false', () => {
        render(<ToggleButton isOn={true} toggleState={() => {}}/>);

        // When isOn == true, the OFF Node should be hidden.
        const OffNode = screen.getByTestId(SWITCH_OFF_TEST_ID);
        expect(OffNode).toHaveClass(SWITCH_HIDDEN_ELEMENT_CLASS);

        // But the ON Node should be visible.
        const OnNode = screen.getByTestId(SWITCH_ON_TEST_ID);
        expect(OnNode).not.toHaveClass(SWITCH_HIDDEN_ELEMENT_CLASS);
    });

    it('should display second element when value of switch is true', () => {
        render(<ToggleButton isOn={false} toggleState={() => {}}/>);

        // When isOn == false, the OFF Node should be visible.
        const OffNode = screen.getByTestId(SWITCH_OFF_TEST_ID);
        expect(OffNode).not.toHaveClass(SWITCH_HIDDEN_ELEMENT_CLASS);

        // But the ON Node should be hidden.
        const OnNode = screen.getByTestId(SWITCH_ON_TEST_ID);
        expect(OnNode).toHaveClass(SWITCH_HIDDEN_ELEMENT_CLASS);
    });

    it('should trigger callback when switch is clicked', async () => {
        const toggleStateCallback = jest.fn();
        const user = userEvent.setup();
        render(<ToggleButton isOn={false} toggleState={toggleStateCallback}/>);

        // Trigger a click event on the button.
        const buttonContainer = screen.getByTestId(SWITCH_CONTAINER_ID);
        expect(buttonContainer).toBeInTheDocument();
        await user.click(buttonContainer);

        // After click, the toggleState method should be called.
        expect(toggleStateCallback).toBeCalledTimes(1);
    });

});
