import PCard from "./components/PCard";
import Hand from "./components/Hand";
import { Stack } from "@mui/material";

function Game() {
    return (
        <Stack container width="100vw" height="100vh" flexDirection="column">
            <Stack
                container
                height="calc(100vh / 3)"
                alignItems="flex-start"
                justifyContent="center"
                overflow="hidden"
                pt="5px"
                direction="row"
            >
                <PCard card={37} />
            </Stack>
            <Stack
                container
                height="calc(100vh / 3)"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                overflow="hidden"
                px={1}
                direction="row"
            >
                <PCard card={26} />
                <PCard card={1} />
                <PCard card={38} />
            </Stack>
            <Stack
                container
                width="100vw"
                height="calc(100vh / 3)"
                alignItems="flex-end"
                justifyContent="center"
                overflow="hidden"
                pb="5px"
                direction="row"
            >
                <Hand />
            </Stack>
        </Stack>
    );
}

export default Game;
