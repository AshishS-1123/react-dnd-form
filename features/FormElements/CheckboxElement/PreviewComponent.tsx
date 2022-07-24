import React, { ChangeEvent, useState } from "react";
import { KeyValuePair } from "../../../components/OptionContainer";

export interface Props {
    inputLabel: string,
    options: KeyValuePair[],
    isRequired: boolean,
    externalError: string,
    setResponse: (selectedOptions: string[]) => void,
}

interface CheckboxContainerProps {
    label: string,
    value: string,
    toggleCheckbox: (toggleState: boolean, checkboxKey: string) => void,
}

function CheckboxContainer(props: CheckboxContainerProps): JSX.Element {
    const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
        props.toggleCheckbox(event.target.checked, props.label)
    }

    return (
        <div data-testid="element-checkbox-preview-checkboxContainer">
            <label 
                htmlFor={`element-checkbox-preview-checkBox-input-${props.value.replace(" ", "")}`} 
                id={`element-checkbox-preview-checkBox-label-${props.value.replace(" ", "")}`} 
            >
                {props.label}
            </label>

            <input
                type="checkbox"
                id={`element-checkbox-preview-checkBox-input-${props.value.replace(" ", "")}`} 
                name={props.value}
                value={props.value}
                onChange={handleCheckboxClick}
            />
        </div>
    );
}

function PreviewComponent(props: Props): JSX.Element {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (toggleState: boolean, checkboxKey: string) => {
        if (toggleState === true) {
            setSelectedOptions(prevOptions => {
                props.setResponse([...prevOptions, checkboxKey]);
                return [...prevOptions, checkboxKey]
            });
        } else {
            setSelectedOptions(prevOptions => {
                const newOptions = prevOptions.filter(opt => opt !== checkboxKey);
                props.setResponse(newOptions);
                return newOptions;
            });
        }
    }

    return (
        <>
            <label htmlFor="element-checkbox-preview-input" id="element-checkbox-preview-label">
                {props.inputLabel}
            </label>

            <input type="text" id="element-checkbox-preview-input" />

            {
                props.options.map(option => {
                    return (
                        <CheckboxContainer 
                            label={option.key} 
                            value={option.value} 
                            key={option.key}
                            toggleCheckbox={handleCheckboxChange}
                        />
                    );
                })
            }

            <p data-testid="element-checkbox-preview-errorNode">{props.externalError}</p>
        </>
    );
}

export default PreviewComponent;
