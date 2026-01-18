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
import { DEFAULT_QR_TEXT } from "../../lib/constants";

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [exampleUrl, setExampleUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    setExampleUrl(
      `${location.origin}/api/v1?data=${encodeURIComponent(DEFAULT_QR_TEXT)}`
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

        <Typography variant="body2" color="text.secondary" mb={2}>
          Live preview:
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
      </Card>
    </Container>
  );
}
