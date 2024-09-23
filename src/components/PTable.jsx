import { Box } from "@mui/material";
import PCard from "./PCard";

const PTable = () => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "40vw",
                aspectRatio: "1 / 1",
            }}
        >
            {Array.from({ length: 4 }).map((_, i) => {
                return (
                    <PCard
                        key={i + 1}
                        card={Math.ceil(Math.random() * 52)}
                        sx={{
                            position: "absolute",
                            top: Math.floor(Math.random() * 45) + "%",
                            left: Math.floor(Math.random() * 45) + "%",
                            transform: `rotate(${Math.floor(
                                Math.random() * 45 - 22.5
                            )}deg)`,
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
