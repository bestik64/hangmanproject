import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IResult } from "../../models/Result";
import { IScore } from "../../models/Score";
import { calculateScoreSmarter } from "../../helpers/calculationHelpers";
import "../DashboardModal/DashboardModal.css";

interface IProps {
    isOpen: boolean;
    close: any;
    data: IResult[] | undefined;
    scores: IScore[];
    setScores: React.Dispatch<React.SetStateAction<IScore[]>>;
}

export const DashboardModal = (props: IProps) => {
    const data = props.data;
    const setScores = props.setScores;

    const calculateScore = (err: number) => {
        if (err) {
            return 100 / (1 + err);
        }
    };

    useEffect(() => {
        if (data?.length !== 0) {
            data?.forEach(d => {
                let calcScore = {
                    user: d.userName,
                    score: calculateScoreSmarter(
                        d.errors!,
                        d.uniqueCharacters!,
                        d.length!,
                        d.duration!
                    ).toFixed(4),
                };
                setScores(arr => [...arr, calcScore]);
            });
        }
        //setScores not added to dependency array because of possible unwanted multiple renderings
    }, [data]);

    return (
        <Modal isOpen={props.isOpen} onClose={props.close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Highest scores</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="modal-body">
                    <Table variant="simple" className="table-container">
                        <Thead>
                            <Tr>
                                <Th className="column">Player</Th>
                                <Th className="column">Score</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.scores.length !== 0
                                ? props.scores
                                      .sort((a, b) => parseFloat(b.score!) - parseFloat(a.score!))
                                      .map((row, index) => (
                                          <Tr key={index}>
                                              <Td className="column">{row.user}</Td>
                                              <Td className="column">{row.score}</Td>
                                          </Tr>
                                      ))
                                : null}
                        </Tbody>
                    </Table>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.close}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
