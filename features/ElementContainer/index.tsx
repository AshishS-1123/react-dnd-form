import React, { useContext } from "react";
import BooleanDisplayName from "../FormElements/BooleanElement/DisplayName";
import InputDisplayName from "../FormElements/InputElement/DisplayName";
import CheckboxDisplayName from "../FormElements/CheckboxElement/DisplayName";
import DropdownDisplayName from "../FormElements/DropdownElement/DisplayName";
import RadioDisplayName from "../FormElements/RadioButtonElement/DisplayName";
import { FormDataContext } from "../../store/Provider";
import { AllowedElements } from "../constants";

function ElementContainer() {
    const { triggerCreationDialog } = useContext(FormDataContext);

    const handleFormElementClick = (elementType: AllowedElements) => {
        triggerCreationDialog(elementType);
    }

    return (
        <section className="flex flex-col z-0" style={{width: "200px", minHeight: "100vh"}}>
            <BooleanDisplayName onClick={handleFormElementClick}/>
            <InputDisplayName onClick={handleFormElementClick}/>
            <CheckboxDisplayName onClick={handleFormElementClick}/>
            <DropdownDisplayName onClick={handleFormElementClick}/>
            <RadioDisplayName onClick={handleFormElementClick}/>
        </section>
    );
}

export default ElementContainer;