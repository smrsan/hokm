import Box from "@mui/material/Box";

import PCard from "./PCard";
import { useHandCards } from "../stores/handCards";
import WonCards from "./WonCards";
import { Stack } from "@mui/material";

const Hand = () => {
    const handCards = useHandCards((state) => state.cards);

    return (
        <Stack px="auto">
            <Box
                sx={{
                    width: "min(25vw, 25vh)",
                    mx: "auto",
                    mb: 1,
                }}
            >
                <WonCards count={7} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "calc(100vw - 200px)",
                    height: "100%",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "512px",
                        maxWidth: "90vw",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        overflowX: "scroll",
                        gap: "8px",
                        mb: "8px",
                    }}
                >
                    {handCards.map((card, i) => (
                        <PCard
                            key={card.num + "-" + i}
                            {...{
                                card,
                                grabbable: true,
                            }}
                            sx={{
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Stack>
    );
};

export default Hand;
