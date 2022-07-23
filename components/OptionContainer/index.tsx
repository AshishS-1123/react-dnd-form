import { loadOptions } from "@babel/core";
import React, { useState } from "react";
import AddOptionContainer from "./AddOptionContainer";
import OptionPreview from "./OptionPreview";

export interface KeyValuePair {
    key: string,
    value: string,
}

export interface Props {
    setOptionsExternal: (options: KeyValuePair[]) => void,
}

function OptionContainer(props: Props): JSX.Element {
    const [options, setOptions] = useState<KeyValuePair[]>([]);

    const addOptionHandler = (option: KeyValuePair) => {
        if (options.findIndex(item => item.key === option.key || item.value === option.value) === -1) {
            // Option is not duplicate. So add to state.
            setOptions([...options, option]);
            props.setOptionsExternal([...options, option]);
        }
    }

    const deleteOptionHandler = (id: string) => {
        // Here id refers to the key of the option.
        setOptions(options.filter(option => option.key !== id));
        props.setOptionsExternal(options.filter(option => option.key !== id));
    }

    return (
        <div data-testid="component-optionContainer-container">
            {
                options.map(option => {
                    return (
                        <OptionPreview 
                            key={`${option.key}-${option.value}`}
                            option={option}
                            id={option.key}
                            deleteSelf={deleteOptionHandler}
                        />
                    );
                })
            }

            <AddOptionContainer 
                addOption={addOptionHandler}
                errorMessage=""
            />
        </div>
    );
}

export default OptionContainer;
