import axios from "axios";
import {
  Card,
  Label,
  FileInput,
  TextInput,
  Radio,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = useState(null);

  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [description, setDescription] = useState("");
  const [kategori, setKategori] = useState("");
  const [map, setMap] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}/umkm/${id}`).then((res) => {
        setData(res.data);
        setNama(res.data.namaUmkm);
        setDescription(res.data.description);
        setKategori(res.data.category);
        setMap(res.data.maps  );
        setWhatsapp(res.data.whatsapp);
        setInstagram(res.data.instagram);
        setTiktok(res.data.tiktok);
        setFacebook(res.data.facebook);

      })
    }
    fetchData();
  }, []);

  const handleSubmit = async (e, umkm_id) => {
    e.preventDefault();

    const formData = new FormData();
    if(image){
      formData.append("image", image);
    }
    formData.append("namaUmkm", nama);
    formData.append("description", description);
    formData.append("category", kategori);
    formData.append("maps", map);
    formData.append("whatsapp", whatsapp);
    formData.append("instagram", instagram);
    formData.append("tiktok", tiktok);
    formData.append("facebook", facebook);

    await axios.post(`${import.meta.env.VITE_API_URL}/umkm/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      alert("Data berhasil diubah");
      navigate( `/admin/menu/${umkm_id}`);
    })
  }

  
  return (
    <>
      <main className="p-5 my-10 sm:mx-32 lg:mx-60">
        <Card>
          <div className="text-start">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Data UMKM
              <hr className="border-gray-200 mt-2" />
            </h3>

            {/* Input Gambar */}
            <div className="mt-3 block">
              <Label htmlFor="file-upload" value="Gambar UMKM" />
              <FileInput
                id="file-upload"
                  onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Input Nama UMKM */}
            <div className="mt-3">
              <Label htmlFor="title" value="Nama UMKM" />
              <TextInput
                id="title"
                placeholder="Masukkan Nama UMKM"
                value={nama}
                  onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            {/* Input Deskripsi */}
            <div className="mt-3">
              <Label htmlFor="deskripsi" value="Masukkan Deskripsi UMKM" />
              <TextInput
                id="deskripsi"
                placeholder="Masukkan Deskripsi UMKM"
                value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    checked={kategori == "minuman"}
                      onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="minuman">Minuman</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="jasa"
                    name="kategori"
                    value="jasa"
                    checked={kategori == "jasa"}
                      onChange={(e) => setKategori(e.target.value)}
                  />
                  <Label htmlFor="jasa">Jasa</Label>
                </div>
              </fieldset>
            </div>

            {/* Input Link Sosial Media */}
            <div className="mt-3 block">
              <Label value="MAP" />
              <TextInput
                id="map"
                placeholder="Masukkan Link MAP"
                value={map}
                  onChange={(e) => setMap(e.target.value)}
              />
            </div>
            <div className="mt-3 block">
              <Label value="WhatsApp" />
              <TextInput
                id="wa"
                value={whatsapp}
                placeholder="Masukkan Link WA"
                  onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div className="mt-3 block">
              <Label value="Instagram" />
              <TextInput
                id="ig"
                value={instagram}
                placeholder="Masukkan Link IG"
                  onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="mt-3 block">
              <Label value="Tiktok" />
              <TextInput
                id="tt"
                value={tiktok}
                placeholder="Masukkan Link Tiktok"
                  onChange={(e) => setTiktok(e.target.value)}
              />
            </div>
            <div className="mt-3 block">
              <Label value="Facebook" />
              <TextInput
                id="fb"
                value={facebook}
                placeholder="Masukkan Link Facebook"
                  onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            {/* Tombol Submit */}
            <div className="mt-6">
              <hr className="border-gray-200 mb-2" />
              <Button
                className="mt-1 bg-gray-200 text-black"
                  onClick={()=>handleSubmit(event, id)}
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

export default Update;
