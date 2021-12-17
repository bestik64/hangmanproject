import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const onSignOut = () => {
        sessionStorage.setItem("user", "");
        sessionStorage.setItem("loggedIn", "false");
        navigate("/");
    };

    return (
        <Flex className="home-header" flexDirection="row" justifyContent="space-between">
            <p>
                <strong>Hello, {sessionStorage.getItem("user")}</strong>
            </p>
            <p>YourHangman</p>
            <Button onClick={onSignOut}>Sign out</Button>
        </Flex>
    );
};
