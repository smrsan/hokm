import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PCard from "./PCard";

const WonCards = ({ count = 0 }) => {
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
            {Array.from({ length: count }).map((_, i) => {
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
            {!!count && (
                <Typography
                    sx={{
                        position: "relative",
                        left: `-${count * 12.75}%`,
                        color: (theme) => theme.palette.common.white,
                    }}
                >
                    {count}
                </Typography>
            )}
        </Box>
    );
};

export default WonCards;
