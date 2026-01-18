import { Box, Typography } from "@mui/material";
import { APP_NAME } from "../lib/constants";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {APP_NAME} — Built by Jubin
      </Typography>
    </Box>
  );
}
