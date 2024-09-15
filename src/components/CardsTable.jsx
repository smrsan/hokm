import { Box } from "@mui/material";
import bgImg from "/images/table-bg.jpg";

/** @type {import("@mui/material").BoxProps["sx"]} */
const rootSx = {
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    position: "absolute",
    backgroundImage: `url("${bgImg}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};

const CardsTable = ({ children }) => <Box sx={rootSx}>{children}</Box>;

export default CardsTable;
