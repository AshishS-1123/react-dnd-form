import React, { ChangeEvent } from "react";
import { KeyValuePair } from "../../../components/OptionContainer";

export interface Props {
    inputLabel: string,
    options: KeyValuePair[],
    isRequired: boolean,
    externalError: string,
    setResponse: (selectedOptions: string) => void,
}

function PreviewComponent(props: Props): JSX.Element {
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResponse(event.target.value);
    }

    return (
        <>
            <span id="element-radio-preview-label">
                {props.inputLabel}
            </span>

            {
                props.options.map(option => {
                    return (
                        <label key={option.key} data-testid="element-radio-preview-radioContainer">
                            <input 
                                type="radio" 
                                value={option.value} 
                                name={option.value} 
                                onChange={handleRadioChange}
                            />
                            {option.key}
                        </label>
                    );
                })
            }

            <p data-testid="element-radio-preview-errorNode">{props.externalError}</p>
        </>
    );
}

export default PreviewComponent;
