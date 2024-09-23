import Grid from "@mui/material/Grid2";
import PCard from "./components/PCard";
import Hand from "./components/Hand";

function Game() {
    return (
        <Grid container width="100vw" height="100vh" flexDirection="column">
            <Grid
                container
                height="calc(100vh / 3)"
                alignItems="flex-start"
                justifyContent="center"
                overflow="hidden"
                pt="5px"
            >
                <PCard card={37} />
            </Grid>
            <Grid
                container
                height="calc(100vh / 3)"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                overflow="hidden"
                px={1}
            >
                <PCard card={26} />
                <PCard card={1} />
                <PCard card={38} />
            </Grid>
            <Grid
                container
                width="100vw"
                height="calc(100vh / 3)"
                alignItems="flex-end"
                justifyContent="center"
                overflow="hidden"
                pb="5px"
            >
                <Hand />
            </Grid>
        </Grid>
    );
}

export default Game;
