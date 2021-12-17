import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Spinner, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IQuote } from "../../models/Quote";
import { IResult } from "../../models/Result";
import { getQuote } from "../../services/quotesService";
import { getScores, postResult } from "../../services/resultsService";
import { Header } from "../Header/Header";
import { DashboardModal } from "../DashboardModal/DashboardModal";
import "../Home/Home.css";
import { QuoteDisplay } from "../QuoteDisplay/QuoteDisplay";
import { IScore } from "../../models/Score";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { SetWord } from "../../actions/wordActions";

export const Home = () => {
    const [quote, setQuote] = useState<IQuote>();
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [wrongLetters, setWrongLetters] = useState<string[]>([]);
    const [restart, setRestart] = useState<boolean>(true);
    const [playable, setPlayable] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IResult>();
    const [dashboardData, setDashboardData] = useState<IResult[]>();
    const [openDashboardModal, setOpenDashboardModal] = useState<boolean>(false);
    const [scores, setScores] = useState<IScore[]>([]);
    const [startTime, setStartTime] = useState<number>();
    const [endTime, setEndTime] = useState<number>();
    const dispatch = useDispatch();
    const word = useSelector((state: AppState) => state.word.text);
    const toast = useToast();

    const fetchQuote = useCallback(async () => {
        if (restart === true) {
            setLoading(true);
            const data = await getQuote();
            setQuote(data);
            dispatch(SetWord(data.content));
            setStartTime(performance.now());
            setRestart(false);
            setLoading(false);
        }
    }, [restart, dispatch]);

    const sendResult = useCallback(async () => {
        setLoading(true);
        const res = await postResult(result);
        if (res === 201) {
            const data = await getScores();
            if (Array.isArray(data)) {
                setDashboardData(data);
                setLoading(false);
                setOpenDashboardModal(true);
            }
        }
    }, [result]);

    const onRestart = () => {
        setPlayable(true);
        setRestart(true);
        setCorrectLetters([]);
        setWrongLetters([]);
    };

    const checkGameEnd = useCallback(() => {
        let end = true;
        word.split("").forEach((letter: string) => {
            const letterFilter =
                letter.toUpperCase().charCodeAt(0) > 65 && letter.toUpperCase().charCodeAt(0) < 90;
            if (!correctLetters.includes(letter.toLowerCase()) && letterFilter) {
                end = false;
            }
        });
        return end;
    }, [correctLetters, word]);

    useEffect(() => {
        if (checkGameEnd() && correctLetters.length !== 0) {
            setEndTime(performance.now());
            setPlayable(false);
            toast({
                title: "Congrats!",
                description: "You guessed all the letters. Please submit your result.",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            setResult({
                quoteId: quote?._id,
                length: word.length,
                uniqueCharacters: correctLetters.length,
                userName: sessionStorage.getItem("user") ?? undefined,
                errors: wrongLetters.length,
                duration: endTime! - startTime! > 0 ? endTime! - startTime! : 0,
            });
        }
    }, [correctLetters, checkGameEnd, toast, quote?._id, word.length, wrongLetters.length]);

    useEffect(() => {
        const handleKeydown = (event: any) => {
            const { key, keyCode } = event;
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                if (word.toLowerCase().includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(currentLetters => [...currentLetters, letter]);
                    } else {
                        toast({
                            description: "The letter is already displayed.",
                            status: "info",
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters(currentLetters => [...currentLetters, letter]);
                    } else {
                        toast({
                            description: "You already tried this letter.",
                            status: "info",
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [correctLetters, wrongLetters, playable, word, toast]);

    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    const onSubmit = () => {
        sendResult();
    };

    const onModalClose = () => {
        setOpenDashboardModal(false);
        setScores([]);
        setDashboardData([]);
        onRestart();
    };

    return (
        <div className="home-container">
            <Header />
            <Flex className="errors-container" flexDirection="row">
                <span>Errors:</span>
                <span>{wrongLetters.length}</span>
            </Flex>
            <Flex className="content-container" flexDirection="row">
                {loading ? (
                    <Spinner
                        className="spinner"
                        thickness="4px"
                        speed="0.8s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                ) : (
                    <QuoteDisplay correctLetters={correctLetters} />
                )}
                <Flex className="buttons-container" flexDirection="column">
                    <Button className="side-button" disabled={loading} onClick={onRestart}>
                        Restart
                    </Button>
                    <Button
                        className="side-button"
                        disabled={playable || loading}
                        onClick={onSubmit}
                    >
                        Submit your result
                    </Button>
                </Flex>
            </Flex>
            <DashboardModal
                isOpen={openDashboardModal}
                close={onModalClose}
                data={dashboardData}
                scores={scores}
                setScores={setScores}
            />
        </div>
    );
};
