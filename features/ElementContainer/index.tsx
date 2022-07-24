import React from "react";
import BooleanDisplayName from "../FormElements/BooleanElement/DisplayName";
import InputDisplayName from "../FormElements/InputElement/DisplayName";
import CheckboxDisplayName from "../FormElements/CheckboxElement/DisplayName";
import DropdownDisplayName from "../FormElements/DropdownElement/DisplayName";
import RadioDisplayName from "../FormElements/RadioButtonElement/DisplayName";

function ElementContainer() {
    return (
        <section className="flex flex-col" style={{width: "200px", minHeight: "100vh"}}>
            <BooleanDisplayName />
            <InputDisplayName />
            <CheckboxDisplayName />
            <DropdownDisplayName />
            <RadioDisplayName />
        </section>
    );
}

export default ElementContainer;