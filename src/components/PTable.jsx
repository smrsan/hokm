import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import PCard from "./PCard";
import { useGrabbedCard } from "../stores/grabbedCard";
import { isMobile } from "react-device-detect";
import { useTableCards } from "../stores/tableCards";

const PTable = () => {
    const boxRef = useRef();
    const [isGrabbedCardOver, setIsGrabbedCardOver] = useState(false);
    const grabbedCard = useGrabbedCard((state) => state.card);
    const tableCards = useTableCards((state) => state.cards);

    useEffect(() => {
        if (grabbedCard == null) {
            setIsGrabbedCardOver(false);
            return;
        }

        let isGrabbedCardOver = false;

        /** @param {MouseEvent} e */
        function handleMouseMove(e) {
            const touch = isMobile ? e.touches[0] : null;
            const [x, y] = isMobile
                ? [touch.clientX, touch.clientY]
                : [e.clientX, e.clientY];

            const isOver =
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom;

            if (isOver !== isGrabbedCardOver) {
                setIsGrabbedCardOver((isGrabbedCardOver = isOver));
            }
        }

        /** @param {MouseEvent} e */
        function handleMouseUp() {
            const card = useGrabbedCard.getState().drop();

            if (!isGrabbedCardOver) return;

            useTableCards.getState().add({
                num: card.card,
                position: {
                    top: Math.floor(Math.random() * 50),
                    left: Math.floor(Math.random() * 50),
                },
                rotate: Math.floor(Math.random() * 45 - 22.5),
            });
        }

        /** @type {HTMLDivElement} */
        const boxElem = boxRef.current;
        const rect = boxElem.getBoundingClientRect();

        window.addEventListener(
            isMobile ? "touchmove" : "mousemove",
            handleMouseMove
        );
        window.addEventListener(
            isMobile ? "touchend" : "mouseup",
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                isMobile ? "touchmove" : "mousemove",
                handleMouseMove
            );
            window.removeEventListener(
                isMobile ? "touchend" : "mouseup",
                handleMouseUp
            );
        };
    }, [grabbedCard]);

    return (
        <Box
            ref={boxRef}
            sx={{
                position: "relative",
                width: "40vw",
                aspectRatio: "1 / 1",
                border: isGrabbedCardOver
                    ? (theme) => `1px solid ${theme.palette.primary.main}`
                    : "none",
            }}
        >
            {tableCards.map((card, i) => {
                return (
                    <PCard
                        key={card.num + "-" + i}
                        card={card.num}
                        sx={{
                            position: "absolute",
                            top: card.position.top + "%",
                            left: card.position.left + "%",
                            transform: `rotate(${card.rotate}deg)`,
                            animation: "dropCard ease 0.3s",
                            "@keyframes dropCard": {
                                from: {
                                    scale: "1.2",
                                    opacity: 0.9,
                                },
                                to: {
                                    scale: "1",
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default PTable;
