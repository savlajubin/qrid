"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Card,
  Divider,
  TextField,
  Button
} from "@mui/material";

import { DEFAULT_QR_TEXT } from "../../../lib/constants";
import { BASE_PATH } from "../../../lib/basePath";
import { encodeBase64 } from "../../../lib/security";

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState("");
  const [exampleUrl, setExampleUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    setOrigin(window.location.origin);

    const encoded = encodeBase64(DEFAULT_QR_TEXT);

    setExampleUrl(
      `${window.location.origin}${BASE_PATH}/embed?data=${encoded}`
    );
  }, []);

  const iframeCode = `<iframe src="${exampleUrl}" width="300" height="300" style="border:0"></iframe>`;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* HEADER */}
      <Typography variant="h3" fontWeight={600} gutterBottom>
        Embed Documentation
      </Typography>

      <Typography color="text.secondary" mb={4}>
        QRido generates QR codes using a static embed endpoint.
        The embed URL supports Base64-encoded data and optional
        customization parameters.
      </Typography>

      {/* ENDPOINT */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Embed Endpoint
        </Typography>

        <TextField
          fullWidth
          value="/embed"
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" color="text.secondary">
          This endpoint renders an SVG QR code and is safe for static hosting
          and iframe embedding.
        </Typography>
      </Card>

      {/* PARAMETERS */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Parameters
        </Typography>

        <Box mb={2}>
          <Typography><b>data</b> (required)</Typography>
          <Typography variant="body2" color="text.secondary">
            Base64-encoded text or URL to generate the QR code.
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography><b>fg</b> (optional)</Typography>
          <Typography variant="body2" color="text.secondary">
            Foreground color (hex, without #). Default: <code>000000</code>
          </Typography>
        </Box>

        <Box>
          <Typography><b>bg</b> (optional)</Typography>
          <Typography variant="body2" color="text.secondary">
            Background color (hex, without #). Default: <code>ffffff</code>
          </Typography>
        </Box>
      </Card>

      {/* EXAMPLE URL */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Example Embed URL
        </Typography>

        <TextField
          fullWidth
          value={exampleUrl}
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="outlined"
          disabled={!mounted}
          onClick={() => navigator.clipboard.writeText(exampleUrl)}
        >
          Copy URL
        </Button>
      </Card>

      {/* EMBED CODE */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Embed Code
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          value={iframeCode}
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="outlined"
          disabled={!mounted}
          onClick={() => navigator.clipboard.writeText(iframeCode)}
        >
          Copy Embed Code
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* LIVE PREVIEWS */}
        <Grid container spacing={3}>
          {/* DEFAULT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Default QR Preview
            </Typography>

            {mounted && exampleUrl && (
              <iframe
                src={exampleUrl}
                width="300"
                height="300"
                style={{ border: 0 }}
                title="QR Preview Default"
              />
            )}
          </Grid>

          {/* CUSTOM COLORS */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Custom Colors Preview
            </Typography>

            {mounted && origin && (
              <iframe
                src={`${origin}${BASE_PATH}/embed?data=${encodeBase64(
                  DEFAULT_QR_TEXT
                )}&fg=673ab7&bg=f5f5f5`}
                width="300"
                height="300"
                style={{ border: 0 }}
                title="QR Preview Custom"
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
