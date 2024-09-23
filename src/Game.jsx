import Stack from "@mui/material/Stack";
import PCard from "./components/PCard";
import Hand from "./components/Hand";
import PTable from "./components/PTable";

function Game() {
    return (
        <Stack width="100vw" height="100vh">
            <Stack
                height="calc(100vh / 3)"
                alignItems="flex-start"
                justifyContent="center"
                pt="5px"
                direction="row"
            >
                <PCard card={37} />
            </Stack>
            <Stack
                height="calc(100vh / 3)"
                alignItems="center"
                justifyContent="space-between"
                px={1}
                direction="row"
            >
                <PCard card={26} />
                <PTable />
                <PCard card={38} />
            </Stack>
            <Stack
                width="100vw"
                height="calc(100vh / 3)"
                alignItems="flex-end"
                justifyContent="center"
                pb="5px"
                direction="row"
            >
                <Hand />
            </Stack>
        </Stack>
    );
}

export default Game;
