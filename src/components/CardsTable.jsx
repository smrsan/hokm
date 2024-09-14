import { Box } from "@mui/material";
import bgImg from "/images/table-bg.jpg";

const CardsTable = ({ children }) => {
    console.log({
        image: bgImg,
    });

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                position: "absolute",
                backgroundImage: `url("${bgImg}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {children}
        </Box>
    );
};

export default CardsTable;
