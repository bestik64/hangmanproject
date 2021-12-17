import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../Login/Login.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onSubmit = () => {
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("loggedIn", "true");
        navigate("/");
    };

    return (
        <div className="login-container">
            <Flex className="login-center" flexDirection="column">
                <h3 className="login-header">Log in</h3>
                <Input
                    className="username-input"
                    placeholder="username"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <Button disabled={username === ""} onClick={onSubmit}>
                    Submit
                </Button>
            </Flex>
        </div>
    );
};
