const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// DATA DUMMY PROJECT 1
// ==========================
let profil = {
  nama: "PT Maju Sejahtera",
  deskripsi: "Perusahaan penyedia layanan teknologi modern."
};

let visiMisi = {
  visi: "Menjadi perusahaan teknologi terbaik di Indonesia.",
  misi: [
    "Memberikan pelayanan berkualitas",
    "Menciptakan inovasi teknologi",
    "Meningkatkan kesejahteraan masyarakat"
  ]
};

let produk = [
  { id: 1, nama: "Layanan IT Support", harga: "Rp 500.000" },
  { id: 2, nama: "Pengembangan Website", harga: "Rp 5.000.000" },
  { id: 3, nama: "Cloud Service", harga: "Rp 2.500.000" }
];

// ==========================
// ROUTING CRUD
// ==========================

// --- Profil ---
app.get("/profil", (req, res) => res.json(profil));
app.put("/profil", (req, res) => {
  profil = req.body;
  res.json({ message: "Profil diperbarui!", data: profil });
});

// --- Visi & Misi ---
app.get("/visimisi", (req, res) => res.json(visiMisi));
app.put("/visimisi", (req, res) => {
  visiMisi = req.body;
  res.json({ message: "Visi Misi diperbarui!", data: visiMisi });
});

// --- Produk & Layanan ---
app.get("/produk", (req, res) => res.json(produk));
app.post("/produk", (req, res) => {
  const newProduk = { id: Date.now(), ...req.body };
  produk.push(newProduk);
  res.json({ message: "Produk ditambahkan!", data: newProduk });
});
app.put("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id);
  produk = produk.map(p => (p.id === id ? { ...p, ...req.body } : p));
  res.json({ message: "Produk diperbarui!" });
});
app.delete("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id);
  produk = produk.filter(p => p.id !== id);
  res.json({ message: "Produk dihapus!" });
});

// ==========================
// START SERVER
// ==========================
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
