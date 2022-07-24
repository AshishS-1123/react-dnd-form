import React from "react";
import Image from "next/image";
import IconImage from "../../../public/images/dropdown.png";
import { DISPLAY_NAME_STYLE } from "../../constants";

export interface Props {
}

function DisplayName(props: Props) {
    return (
        <div className={DISPLAY_NAME_STYLE}>
            <Image alt="dropdown-element" src={IconImage} width="38px" height="24px"/>
            <span className="content-center gap-2 p-2">Drop Down</span>
        </div>
    );
}

export default DisplayName;