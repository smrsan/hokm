import Stack from "@mui/material/Stack";

import Hand from "../components/Hand";
import PTable from "../components/PTable";
import Profile from "../components/Profile";

function GamePage() {
    return (
        <Stack width="100vw" height="100vh">
            <Stack
                height="calc(100vh / 3)"
                alignItems="flex-start"
                justifyContent="center"
                pt="5px"
                direction="row"
            >
                <Profile male name={"Reza"} />
            </Stack>
            <Stack
                height="calc(100vh / 3)"
                alignItems="center"
                justifyContent="space-between"
                px={1}
                direction="row"
            >
                <Profile male name={"Ali"} />
                <PTable />
                <Profile male={false} name={"Melika"} />
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

export default GamePage;
