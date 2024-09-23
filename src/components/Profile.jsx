import { Avatar, Box, Stack, Typography } from "@mui/material";

const Profile = ({ male = true, name = "N/A" }) => {
    return (
        <Stack spacing={0.5}>
            <Avatar
                sx={{
                    width: "min(15vw, 15vh)",
                    get height() {
                        return this.width;
                    },
                }}
            >
                <Box
                    component="img"
                    alt="User"
                    src={`/images/user-${male ? "male" : "female"}.png`}
                    sx={{
                        width: "100%",
                    }}
                />
            </Avatar>
            <Typography
                sx={{
                    color: (theme) => theme.palette.common.white,
                    width: "100%",
                    textAlign: "center",
                }}
                variant="subtitle1"
            >
                {name}
            </Typography>
        </Stack>
    );
};

export default Profile;
