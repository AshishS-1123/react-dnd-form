import React from "react";

export interface Props {
    isOn: boolean,
    toggleState: () => void,
};

/**
 * Working of Toggle Button.
 *   When the switch is on ON state, the switch-on-element will be displayed.
 *   It will have its own set of styles and visuals.
 * 
 *   When the switch is in OFF state, the switch-off-element will be displayed.
 */
function ToggleButton({isOn, toggleState}: Props): JSX.Element {
    const OffElementClasses: string = `toggle-button-off ${isOn ? "toggle-button-hidden" : ""}`;
    const OnElementClasses: string = `toggle-button-on ${isOn ? "" : "toggle-button-hidden"}`;

    return (
        <div
            data-testid="switch-container-id"
            className="toggle-button-container"
            onClick={toggleState}
        >
            <div data-testid="switch-off-element" className={OffElementClasses}></div>
            <div data-testid="switch-on-element" className={OnElementClasses}></div>
        </div>
    );
}

export default ToggleButton;