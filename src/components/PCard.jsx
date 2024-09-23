import { useCallback, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import { useGrabbedCard } from "../stores/grabbedCard";

/**
 * PCard
 * @param {Object} props
 * @param {number} props.card
 * @param {boolean} props.draggable
 * @param {import("@mui/material").BoxProps["sx"]} props.sx
 * @returns
 */
const PCard = ({ card, sx, draggable = false }) => {
    const cardRef = useRef();
    const grabbedCardRef = useRef();
    const mouseMoveHandlerRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const grabCard = useGrabbedCard((state) => state.grab);

    const adjustGrabbedCardPos = useCallback(
        /** @param {MouseEvent} e  */
        (e) => {
            const touch = isMobile ? e.touches[0] : null;
            const [x, y] = isMobile
                ? [touch.clientX, touch.clientY]
                : [e.clientX, e.clientY];

            /** @type {HTMLDivElement} */
            const grabbedCard = grabbedCardRef.current;
            const cardRect = grabbedCard.getBoundingClientRect();

            const pt = cardRect.height - cardRect.height * 0.2;
            const pl = cardRect.width - cardRect.width * 0.3;

            grabbedCard.style.top = y - pt + "px";
            grabbedCard.style.left = x - pl + "px";
            grabbedCard.style.bottom = "auto";
            grabbedCard.style.right = "auto";
        },
        []
    );

    const handleMouseMove = useCallback(
        /** @param {MouseEvent} e  */
        (e) => {
            adjustGrabbedCardPos(e);
        },
        [adjustGrabbedCardPos]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);

        window.removeEventListener(
            isMobile ? "touchmove" : "mousemove",
            mouseMoveHandlerRef.current
        );
    }, []);

    const handleMouseDown = useCallback(
        (e) => {
            if (!draggable) return;

            grabCard({ card });

            setIsDragging(true);
            !isMobile && setTimeout(() => adjustGrabbedCardPos(e));

            window.addEventListener(
                isMobile ? "touchend" : "mouseup",
                handleMouseUp,
                {
                    once: true,
                }
            );
            window.addEventListener(
                isMobile ? "touchmove" : "mousemove",
                (mouseMoveHandlerRef.current = handleMouseMove)
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [draggable, adjustGrabbedCardPos, card]
    );

    return (
        <>
            <Box
                ref={cardRef}
                component="img"
                alt="Playing Card"
                src={`/cards/${card}.svg`}
                draggable={false}
                onMouseDown={!isMobile ? handleMouseDown : () => void 0}
                onTouchStart={isMobile ? handleMouseDown : () => void 0}
                sx={{
                    position: "relative",
                    width: "min(16vw, 16vh)",
                    opacity: isDragging ? 0 : 1,
                    ...sx,
                    cursor: draggable
                        ? isDragging
                            ? "grabbing"
                            : "grab"
                        : "default",
                }}
            />
            {isDragging && (
                <Box
                    ref={grabbedCardRef}
                    component="img"
                    alt="Playing Card"
                    src={`/cards/${card}.svg`}
                    draggable={false}
                    sx={{
                        position: "fixed",
                        width: "min(20vw, 20vh)",
                        cursor: "grabbing",
                        zIndex: 1000,
                        border: "1px solid black",
                        borderRadius: "4px",
                        bottom: "100vh",
                        right: "100vw",
                        transform: "rotate(5deg)",
                    }}
                />
            )}
        </>
    );
};

export default PCard;
