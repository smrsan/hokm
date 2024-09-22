import Box from "@mui/material/Box";

import PCard from "./PCard";

const Hand = () => {
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
                {Array.from({ length: 13 }).map((_, i) => (
                    <PCard
                        key={i + 1}
                        {...{
                            card: i + 1,
                            draggable: true,
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
