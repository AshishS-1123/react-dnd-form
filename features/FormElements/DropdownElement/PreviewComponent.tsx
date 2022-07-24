import React, { ChangeEvent, useState } from "react";
import { KeyValuePair } from "../../../components/OptionContainer";

export interface Props {
    inputLabel: string,
    options: KeyValuePair[],
    isRequired: boolean,
    externalError: string,
    setResponse: (selectedOption: string) => void,
}

function PreviewComponent(props: Props): JSX.Element {
    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        props.setResponse(event.target.value);
    }

    return (
        <>
            <label htmlFor="element-dropdown-preview-input" id="element-dropdown-preview-label">
                {props.inputLabel}
            </label>

            <select 
                data-testid="element-dropdown-preview-select"
                id="element-dropdown-preview-input" 
                name={props.inputLabel}
                onChange={handleDropdownChange}
            >
                <option value="select-an-option">Select an option</option>
                {
                    props.options.map(option => {
                        return <option value={option.value} key={option.key}>{option.key}</option>
                    })
                }
            </select>

            <p data-testid="element-dropdown-preview-errorNode">{props.externalError}</p>
        </>
    );
}

export default PreviewComponent;
