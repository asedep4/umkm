import axios from "axios";
import {
  Card,
  Label,
  FileInput,
  TextInput,
  Radio,
  Button,
} from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMenu = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // formData.append("id", null);
    formData.append("umkm_id", id);
    formData.append("image", image);
    formData.append("namaMakanan", nama);
    formData.append("category", kategori);
    formData.append("harga", price);

    await axios.post(`${import.meta.env.VITE_API_URL}/menu`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {

      navigate(`/admin/menu/${id}`);
      alert("Data berhasil ditambahkan");
    })
  }

  return (
    <>
      <main className="p-5 my-10 sm:mx-32 lg:mx-60">
        <Card>
          <div className="text-start">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Tambah Data Menu
              <hr className="border-gray-200 mt-2" />
            </h3>

            {/* Input Gambar */}
            <div className="mt-3 block">
              <Label htmlFor="file-upload" value="Gambar Menu" />
              <FileInput
                id="file-upload"
                  onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Input Nama UMKM */}
            <div className="mt-3">
              <Label htmlFor="title" value="Nama Menu" />
              <TextInput
                id="title"
                placeholder="Masukkan Nama Menu"
                  onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            {/* Radio Button Kategori */}
            <div className="mt-3 block">
              <fieldset>
                <legend>Jenis UMKM</legend>
                <div className="flex items-center gap-2">
                  <Radio
                    id="makanan"
                    name="kategori"
                    value="makanan"
                      onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="makanan">Makanan</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="minuman"
                    name="kategori"
                    value="minuman"
                      onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="minuman">Minuman</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="jasa"
                    name="kategori"
                    value="jasa"
                      onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="jasa">Jasa</Label>
                </div>
              </fieldset>
            </div>

            {/* Input Harga Menu */}
            <div className="mt-3">
              <Label htmlFor="price" value="Harga Menu" />
              <TextInput
                id="price"
                placeholder="Masukkan Harga Menu, Contoh: 15000"
                  onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Tombol Submit */}
            <div className="mt-6">
              <hr className="border-gray-200 mb-2" />
              <Button
                className="mt-1 bg-gray-200 text-black"
                  onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default AddMenu;
