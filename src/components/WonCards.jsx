import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PCard from "./PCard";
import { useWonCards } from "../stores/wonCards";

const WonCards = ({ playerNum }) => {
    const totalWonCards = useWonCards((state) => state.wonCards);
    const wonCardsCount = useMemo(
        () => totalWonCards?.[playerNum] ?? 0,
        [playerNum, totalWonCards]
    );

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            {Array.from({ length: wonCardsCount }).map((_, i) => {
                const width = "min(5vw, 5vh)";

                return (
                    <PCard
                        key={i + 1}
                        card={{ num: -1 }}
                        sx={{
                            width,
                            border: "1px solid green",
                            position: "relative",
                            left: `-${i * 12.5}%`,
                        }}
                    />
                );
            })}
            {!!wonCardsCount && (
                <Typography
                    sx={{
                        position: "relative",
                        left: `-${wonCardsCount * 12.75}%`,
                        color: (theme) => theme.palette.common.white,
                    }}
                >
                    {wonCardsCount}
                </Typography>
            )}
        </Box>
    );
};

export default WonCards;
