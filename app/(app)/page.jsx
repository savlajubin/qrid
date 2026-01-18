"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  Typography
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Share as ShareIcon,
  Code as CodeIcon
} from "@mui/icons-material";

import { generateQr } from "../../lib/qrService";
import { buildPayload, DEFAULT_QR_TEXT } from "../../lib/qrPayloads";
import { validatePreset } from "../../lib/validators";
import { downloadSvg, downloadPngFromSvg, downloadJpgFromSvg } from "../../lib/pngExport";


export default function PageContent() {
  const [preset, setPreset] = useState("url");
  const [svg, setSvg] = useState("");

  const [form, setForm] = useState({
    url: "",
    text: "",
    upi: { pa: "", pn: "", am: "" },
    wifi: { ssid: "", password: "", security: "WPA" },
    vcard: { name: "", phone: "", email: "" },
    colors: {
      fg: "",
      bg: ""
    }
  });

  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedCode, setEmbedCode] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [downloadAnchor, setDownloadAnchor] = useState(null);

  const validationError = validatePreset(preset, form);
  const isValid = !validationError;

  const shouldShowDefaultQr = !dirty;

  const qrData =
    isValid && dirty
      ? buildPayload(preset, form)
      : null;

  useEffect(() => {
    if (!qrData && !shouldShowDefaultQr) return;

    const dataToGenerate = qrData || DEFAULT_QR_TEXT;

    generateQr({ data: dataToGenerate, colors: form.colors }).then(setSvg);
  }, [qrData, form.colors, shouldShowDefaultQr]);


  function showSnackbar(message, severity = "info") {
    setSnackbar({ open: true, message, severity });
  }

  useEffect(() => {
    const apiUrlData =
      typeof window !== "undefined" && qrData
        ? `${location.origin}/embed?data=${encodeURIComponent(qrData)}${(form.colors.fg || form.colors.bg)
          ? `&fg=${form.colors.fg.replace("#", "") || "000000"}&bg=${form.colors.bg.replace("#", "") || "ffffff"}`
          : ""
        }`
        : "";

    setApiUrl(apiUrlData);
    setEmbedCode(`<iframe src="${apiUrlData}" width="300" height="300" style="border:0"></iframe>`);
  }, [qrData, form.colors]);

  return (
    <>
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Tabs
            value={preset}
            onChange={(_, v) => {
              setPreset(v);
              setTouched(false);
              setDirty(false);
            }}
          >
            <Tab value="url" label="URL" />
            <Tab value="text" label="Text" />
            <Tab value="upi" label="UPI" />
            <Tab value="wifi" label="WiFi" />
            <Tab value="vcard" label="vCard" />
          </Tabs>

          <Grid container spacing={3}>
            {/* LEFT */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 2 }}>
                {preset === "url" && (
                  <TextField
                    fullWidth
                    label="Website URL"
                    value={form.url}
                    onChange={e => {
                      setDirty(true);
                      setForm({ ...form, url: e.target.value });
                    }}
                    onBlur={() => setTouched(true)}
                    error={touched && !isValid}
                    helperText={touched ? validationError : ""}
                  />
                )}

                {preset === "text" && (
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label="Text"
                    value={form.text}
                    onChange={e => {
                      setDirty(true);
                      setForm({ ...form, text: e.target.value });
                    }}
                    onBlur={() => setTouched(true)}
                    error={touched && !isValid}
                    helperText={touched ? validationError : ""}
                  />
                )}

                {preset === "upi" && (
                  <>
                    <TextField
                      fullWidth
                      label="UPI ID"
                      sx={{ mb: 2 }}
                      value={form.upi.pa}
                      onChange={e => {
                        setDirty(true);
                        setForm({
                          ...form,
                          upi: { ...form.upi, pa: e.target.value }
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      error={touched && !isValid}
                      helperText={touched ? validationError : ""}
                    />
                    <TextField
                      fullWidth
                      label="Payee Name"
                      sx={{ mb: 2 }}
                      value={form.upi.pn}
                      onChange={e =>
                        setForm({
                          ...form,
                          upi: { ...form.upi, pn: e.target.value }
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Amount"
                      value={form.upi.am}
                      onChange={e =>
                        setForm({
                          ...form,
                          upi: { ...form.upi, am: e.target.value }
                        })
                      }
                    />
                  </>
                )}

                {preset === "wifi" && (
                  <>
                    <TextField
                      fullWidth
                      label="WiFi SSID"
                      sx={{ mb: 2 }}
                      value={form.wifi.ssid}
                      onChange={e => {
                        setDirty(true);
                        setForm({
                          ...form,
                          wifi: {
                            ...form.wifi,
                            ssid: e.target.value
                          }
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      error={touched && !isValid}
                      helperText={touched ? validationError : ""}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      sx={{ mb: 2 }}
                      value={form.wifi.password}
                      onChange={e =>
                        setForm({
                          ...form,
                          wifi: {
                            ...form.wifi,
                            password: e.target.value
                          }
                        })
                      }
                    />
                    <Select
                      fullWidth
                      value={form.wifi.security}
                      onChange={e =>
                        setForm({
                          ...form,
                          wifi: {
                            ...form.wifi,
                            security: e.target.value
                          }
                        })
                      }
                    >
                      <MenuItem value="WPA">WPA/WPA2</MenuItem>
                      <MenuItem value="WEP">WEP</MenuItem>
                      <MenuItem value="nopass">No Password</MenuItem>
                    </Select>
                  </>
                )}

                {preset === "vcard" && (
                  <>
                    <TextField
                      fullWidth
                      label="Full Name"
                      sx={{ mb: 2 }}
                      value={form.vcard.name}
                      onChange={e => {
                        setDirty(true);
                        setForm({
                          ...form,
                          vcard: {
                            ...form.vcard,
                            name: e.target.value
                          }
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      error={touched && !isValid}
                      helperText={touched ? validationError : ""}
                    />

                    <TextField
                      fullWidth
                      label="Phone"
                      sx={{ mb: 2 }}
                      value={form.vcard.phone}
                      onChange={e =>
                        setForm({
                          ...form,
                          vcard: {
                            ...form.vcard,
                            phone: e.target.value
                          }
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={form.vcard.email}
                      onChange={e =>
                        setForm({
                          ...form,
                          vcard: {
                            ...form.vcard,
                            email: e.target.value
                          }
                        })
                      }
                    />
                  </>
                )}

                <Box mt={2}>
                  <Typography mb={2} variant="subtitle2" gutterBottom>
                    Colors (optional)
                  </Typography>

                  <Box display="flex" gap={2}>
                    <TextField
                      label="Foreground"
                      type="color"
                      value={form.colors.fg || "#000000"}
                      onChange={e => {
                        setDirty(true);
                        setForm({
                          ...form,
                          colors: {
                            ...form.colors,
                            fg: e.target.value
                          }
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      fullWidth
                    />

                    <TextField
                      label="Background"
                      type="color"
                      value={form.colors.bg || "#ffffff"}
                      onChange={e => {
                        setDirty(true);
                        setForm({
                          ...form,
                          colors: {
                            ...form.colors,
                            bg: e.target.value
                          }
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      fullWidth
                    />
                  </Box>
                </Box>

              </Card>
            </Grid>

            {/* RIGHT */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 2 }}>
                <Box display="flex" justifyContent="center">
                  {svg && (
                    <Box
                      component="img"
                      // Convert string to base64 Data URL for safe rendering
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                      alt="Generated QR Code"
                      sx={{
                        width: '100%',
                        maxWidth: '300px',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  )}
                </Box>

                <Box
                  mt={2}
                  display="flex"
                  gap={1}
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    onClick={() => {
                      if (!isValid) {
                        showSnackbar(validationError, "warning");
                        return;
                      }
                      navigator.clipboard.writeText(apiUrl);
                      showSnackbar("Share link copied", "success");
                    }}
                  >
                    Share
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<CodeIcon />}
                    onClick={() => {
                      if (!isValid) {
                        showSnackbar(validationError, "warning");
                        return;
                      }
                      setEmbedOpen(true);
                    }}
                  >
                    Embed
                  </Button>

                  <Button
                    variant="contained"
                    onClick={e => setDownloadAnchor(e.currentTarget)}
                    disabled={!isValid}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Download
                  </Button>
                </Box>

                <Menu
                  anchorEl={downloadAnchor}
                  open={Boolean(downloadAnchor)}
                  onClose={() => setDownloadAnchor(null)}
                >
                  <MenuItem
                    onClick={() => {
                      downloadSvg(svg, "qrido.svg");
                      setDownloadAnchor(null);
                      showSnackbar("SVG downloaded", "success");
                    }}
                  >
                    Download SVG
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      downloadPngFromSvg(svg, "qrido.png");
                      setDownloadAnchor(null);
                      showSnackbar("PNG downloaded", "success");
                    }}
                  >
                    Download PNG
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      downloadJpgFromSvg(svg, "qrido.jpg");
                      setDownloadAnchor(null);
                      showSnackbar("JPG downloaded", "success");
                    }}
                  >
                    Download JPG
                  </MenuItem>
                </Menu>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* EMBED */}
      <Dialog open={embedOpen} onClose={() => setEmbedOpen(false)} fullWidth>
        <DialogTitle>Embed QR Code</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={embedCode}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmbedOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(embedCode);
              setEmbedOpen(false);
              showSnackbar("Embed code copied", "success");
            }}
          >
            Copy Embed Code
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
