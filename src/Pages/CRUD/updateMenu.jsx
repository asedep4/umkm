import {
  Card,
  Label,
  FileInput,
  TextInput,
  Radio,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateMenu = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Gunakan null awalnya untuk cek apakah data sudah di-fetch
  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/menu/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Perbarui state setelah data diambil
  useEffect(() => {
    if (data) {
      setNama(data.namaMakanan || "");
      setKategori(data.category || "");
      setHarga(data.harga || "");
    }
  }, [data]); 

  const handleSubmit = async (e) => {
    console.log(data)
    // console.log(data.harga)
    e.preventDefault();
    const formData = new FormData();

    if(image){
      formData.append("image", image);
    }
    formData.append("umkm_id", data.umkm_id);
    formData.append("namaMakanan", nama);
    formData.append("category", kategori);
    formData.append("harga", harga);
    formData.append("_method", "PATCH");

    await axios.post(`${import.meta.env.VITE_API_URL}/menu/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      alert("Data berhasil diupdate");
    })
  }

  return (
    <>
      <main className="p-5 my-10 sm:mx-32 lg:mx-60">
        <Card>
          <div className="text-start">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Data Menu
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
                value={nama}
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
                    checked={kategori == "makanan"}
                    onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="makanan">Makanan</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="minuman"
                    name="kategori"
                    value="minuman"
                    checked={kategori === "minuman"}
                    onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="minuman">Minuman</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="jasa"
                    name="kategori"
                    value="jasa"
                    checked={kategori === "jasa"}
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
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </div>

            {/* Tombol Submit */}
            <div className="mt-6">
              <hr className="border-gray-200 mb-2" />
              <Button className="mt-1 bg-gray-200 text-black"
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

export default UpdateMenu;
