import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import BackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Loop";

import useIsMounted from "../hooks/useIsMounted";

const Img404 = styled("img")(() => ({
    display: "block",
    width: "100vw",
    maxWidth: 720,
    margin: "0 auto",
}));

const error404Text = "Page Not Found..!";

const Error404 = () => {
    const nav = useNavigate();
    const [openCollapse, setOpenCollapse] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [showBtns, setShowBtns] = useState(false);
    const isMountedRef = useIsMounted();
    /**
     * @type {import("react").MutableRefObject<HTMLHeadingElement>}
     */
    const textRef = useRef();
    const isAnimatingRef = useRef(false);

    const handleTextAnimation = useCallback(
        async (printedText = "") => {
            if (!isMountedRef.current) return;

            const textElem = textRef.current;

            if (printedText.length >= error404Text.length) {
                textElem.innerText = printedText;
                return;
            }

            await new Promise((r) => setTimeout(r, Math.random() * 200));

            printedText += error404Text[printedText.length];
            textElem.innerText = printedText + "_";

            handleTextAnimation(printedText);
        },
        [isMountedRef]
    );

    useEffect(() => {
        const delays = [
            setTimeout(() => setOpenCollapse(true), 2000),
            setTimeout(() => setShowImg(true), 2500),
            setTimeout(() => setShowBtns(true), 3250),
        ];
        return () => delays.forEach((d) => clearTimeout(d));
    }, []);

    useEffect(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        handleTextAnimation();
    }, [handleTextAnimation]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                m: 0,
                p: 0,
                pb: "25vh",
            }}
        >
            <Collapse
                in={openCollapse}
                style={{
                    transitionDuration: "2s",
                    transitionTimingFunction: "ease !important",
                }}
                unmountOnExit={false}
                mountOnEnter={false}
            >
                <Fade in={showImg}>
                    <Img404
                        src={`${
                            import.meta.env.VITE_BASE_URL
                        }images/404-error.jpg`}
                        alt="Error 404"
                        sx={{
                            width: "min(50vw, 50vh)",
                            borderRadius: 1,
                            mb: 1,
                        }}
                    />
                </Fade>
            </Collapse>
            <Typography
                ref={textRef}
                variant="h4"
                mb={2}
                sx={{
                    color: (theme) => theme.palette.common.white,
                }}
            />
            <Fade in={showBtns}>
                <Box
                    sx={{
                        width: "100vw",
                        maxWidth: 400,
                        mx: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        endIcon={<BackIcon />}
                        onClick={useCallback(() => nav("/"), [nav])}
                        sx={{
                            color: (theme) => theme.palette.common.white,
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="text"
                        endIcon={<RefreshIcon />}
                        onClick={useCallback(
                            () => window.location.reload(),
                            []
                        )}
                        sx={{
                            color: (theme) => theme.palette.common.white,
                        }}
                    >
                        Try Again
                    </Button>
                </Box>
            </Fade>
        </Box>
    );
};

export default Error404;
