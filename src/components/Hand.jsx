import Box from "@mui/material/Box";

import PCard from "./PCard";
import { useHandCards } from "../stores/handCards";

const Hand = () => {
    const handCards = useHandCards((state) => state.cards);

    return (
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
                    justifyContent: "space-between",
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
    );
};

export default Hand;
