import { useCallback, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";

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

    const handleMouseMove = useCallback(
        /** @param {MouseEvent} e  */
        (e) => {
            const touch = isMobile ? e.touches[0] : null;
            const [x, y] = isMobile
                ? [touch.clientX, touch.clientY]
                : [e.clientX, e.clientY];
            const grabbedCard = grabbedCardRef.current;

            grabbedCard.style.top = y - 10 + "px";
            grabbedCard.style.left = x - 10 + "px";
            grabbedCard.style.bottom = "auto";
            grabbedCard.style.right = "auto";
        },
        []
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);

        window.removeEventListener(
            isMobile ? "touchmove" : "mousemove",
            mouseMoveHandlerRef.current
        );
    }, []);

    const handleMouseDown = useCallback(() => {
        if (!draggable) return;

        setIsDragging(true);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draggable]);

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
                    width: "auto",
                    maxWidth: 100,
                    maxHeight: "100%",
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
                        width: "auto",
                        maxWidth: 100,
                        maxHeight: "100%",
                        cursor: "grabbing",
                        zIndex: 1000,
                        border: "1px solid black",
                        borderRadius: "4px",
                        bottom: "100vh",
                        right: "100vw",
                    }}
                />
            )}
        </>
    );
};

export default PCard;
