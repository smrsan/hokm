import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useNavigate } from "react-router-dom";
import { alpha, Box, Button, Paper } from "@mui/material";

const MenuPage = () => {
    const nav = useNavigate();

    useEffect(() => {
        App.addListener("backButton", App.exitApp);
        return () => App.removeAllListeners();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                pb: 10,
            }}
        >
            <Paper
                sx={{
                    width: "min(75vw, 75vh)",
                    mx: "auto",
                    mt: "50px",
                    py: 5,
                    px: 4,
                    bgcolor: (theme) => alpha(theme.palette.common.white, 0.3),
                }}
            >
                <Box
                    component="img"
                    src="/images/main-logo.jpg"
                    alt="Main Logo"
                    sx={{
                        position: "relative",
                        display: "block",
                        width: "min(50vw, 50vh)",
                        borderRadius: 1,
                        mx: "auto",
                        mb: 5,
                    }}
                />
                <PlayButton onClick={() => nav("/game")}>Play</PlayButton>
                <PlayButton color="error">MultiPlayer</PlayButton>
                <MiscButton>Settings</MiscButton>
            </Paper>
        </Box>
    );
};

export default MenuPage;

const PlayButton = ({ ...props }) => (
    <Button
        color="warning"
        {...props}
        variant="contained"
        fullWidth
        sx={{
            mb: 1,
        }}
    />
);

const MiscButton = ({ ...props }) => (
    <Button
        {...props}
        variant="outlined"
        fullWidth
        sx={(theme) => ({
            color: theme.palette.common.white,
            borderColor: theme.palette.common.white,
            mb: 1,
        })}
    />
);
