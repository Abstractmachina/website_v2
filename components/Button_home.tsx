import { useGlobalActions } from "@/stores/globalStore";
import { Page } from "@/types/enum_page";
import React from "react";

function Button_home() {
    const { setNextPage } = useGlobalActions();

    function handleClick() {
        setNextPage(Page.HOME);
    }

    return <div className=" text-white hover:cursor-pointer"
        onClick={handleClick}>Home</div>;
}

export default Button_home;
