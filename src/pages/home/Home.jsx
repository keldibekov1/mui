import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const initialProducts = [{ id: 1, name: "Apple", price: 1.5 }];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleOpen = (product = null) => {
    if (product) {
      setForm({ name: product.name, price: product.price });
      setEditingProduct(product);
    } else {
      setForm({ name: "", price: "" });
      setEditingProduct(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setForm({ name: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      setSnackbar({
        open: true,
        message: "Iltimos, barcha maydonlarni toldiring.",
        severity: "warning",
      });
      return;
    }

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...form, price: parseFloat(form.price) }
            : p
        )
      );
      setSnackbar({
        open: true,
        message: "Mahsulot muvaffaqiyatli tahrirlandi.",
        severity: "success",
      });
    } else {
      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: form.name,
        price: parseFloat(form.price),
      };
      setProducts([...products, newProduct]);
      setSnackbar({
        open: true,
        message: "Yangi mahsulot qo'shildi.",
        severity: "success",
      });
    }

    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan o'chirmoqchimisiz?")) {
      setProducts(products.filter((p) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Mahsulot o'chirildi.",
        severity: "info",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Mahsulotlar CRUD
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Yangi mahsulot qo'shish
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mahsulot nomi</TableCell>
              <TableCell>Narxi ($)</TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Mahsulotlar mavjud emas
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart qismi */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Mahsulot narxlari grafigi
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={products}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mahsulot nomi"
            type="text"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Narxi"
            type="number"
            fullWidth
            name="price"
            value={form.price}
            onChange={handleChange}
            inputProps={{ step: "0.01", min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bekor qilish</Button>
          <Button variant="contained" onClick={handleSave}>
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
