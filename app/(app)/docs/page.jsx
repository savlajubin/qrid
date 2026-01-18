"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Divider,
  TextField,
  Button
} from "@mui/material";
import { DEFAULT_QR_TEXT } from "../../../lib/constants";
import { Grid } from "@mui/system";

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [exampleUrl, setExampleUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    setExampleUrl(
      `${location.origin}/embed?data=${encodeURIComponent(DEFAULT_QR_TEXT)}`
    );
  }, []);

  const iframeCode = `<iframe src="${exampleUrl}" width="300" height="300" style="border:0"></iframe>`;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={600} gutterBottom>
        API Documentation
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Generate QR codes via a simple API.
      </Typography>

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Endpoint
        </Typography>

        <TextField
          fullWidth
          value="/api/v1"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" color="text.secondary">
          Versioned QR generation endpoint (SVG output).
        </Typography>
      </Card>

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          API v2 (Colors)
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Customize QR foreground and background colors.
        </Typography>

        <TextField
          fullWidth
          value={`/api/v2?data=${encodeURIComponent(DEFAULT_QR_TEXT)}&fg=000000&bg=ffffff`}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" color="text.secondary">
          <b>fg</b> → foreground hex color (without #)<br />
          <b>bg</b> → background hex color (without #)
        </Typography>
      </Card>


      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Query Parameters
        </Typography>

        <Box mb={2}>
          <Typography><b>data</b> (required)</Typography>
          <Typography variant="body2" color="text.secondary">
            Text or URL to encode into QR
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography><b>design</b> (optional)</Typography>
          <Typography variant="body2" color="text.secondary">
            classic | phonepe | gpay (default: classic)
          </Typography>
        </Box>

        <Box>
          <Typography><b>size</b> (optional)</Typography>
          <Typography variant="body2" color="text.secondary">
            Size in pixels (100–1000)
          </Typography>
        </Box>
      </Card>

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Example Request
        </Typography>

        <TextField
          fullWidth
          value={exampleUrl}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
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

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Embed QR Code
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          value={iframeCode}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
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


        <Grid container spacing={3}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Live preview v1:
            </Typography>
            {/* ✅ Render iframe ONLY after mount */}
            {mounted && exampleUrl && (
              <iframe
                src={exampleUrl}
                width="300"
                height="300"
                style={{ border: 0 }}
                title="QR Preview"
              />
            )}
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Live preview v2 (with custom colors):
            </Typography>
            {mounted && exampleUrl && (
              <iframe
                src={`/embed?data=${encodeURIComponent(DEFAULT_QR_TEXT)}&fg=673ab7&bg=f5f5f5`}
                width="300"
                height="300"
                style={{ border: 0 }}
                title="QR v2 preview"
              />
            )}
          </Grid>
        </Grid>

      </Card>
    </Container>
  );
}
