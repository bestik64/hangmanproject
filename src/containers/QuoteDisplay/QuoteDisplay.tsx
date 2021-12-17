import React from "react";
import { Flex } from "@chakra-ui/layout";
import "../QuoteDisplay/QuoteDisplay.css";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

interface IProps {
    correctLetters: string[];
}

export const QuoteDisplay = (props: IProps) => {
    const word = useSelector((state: AppState) => state.word.text);

    const filterDisplay = () => {
        return word.split("").map((char, index) => {
            const filter =
                props.correctLetters.includes(char.toLowerCase()) ||
                char.toUpperCase().charCodeAt(0) < 65 ||
                char.toUpperCase().charCodeAt(0) > 90;
            return (
                <span className={filter ? "non-letter" : "letter"} key={index}>
                    {filter ? char : ""}
                </span>
            );
        });
    };

    return (
        <Flex className="quote-display-container" flexDirection="row">
            {filterDisplay()}
        </Flex>
    );
};
