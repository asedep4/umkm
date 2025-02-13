import {
  Card,
  Table,
  Modal,
  Button,
  Label,
  FileInput,
  TextInput,
  Radio,
} from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [umkm, setUmkm] = useState([]);
  const [umkm1, setUmkm1] = useState([]);

  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [description, setDescription] = useState("");
  const [kategori, setKategori] = useState(""); // Pastikan kategori bisa diubah
  const [map, setMap] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      localStorage.getItem("login") === "false"
    ) {
      navigate("/", { replace: true });
    }

    let getData = async () => {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm`);
    };
    getData().then((data) => setUmkm(data.data));
  }, []);

  const deleteClick = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/umkm?id=${id}`).then(() => {
        alert("Data berhasil dihapus");
        window.location.reload();
      })
    }catch (error) {
      console.error(error);
      alert("Gagal mengunggah data.");
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("namaUmkm", nama);
    formData.append("description", description);
    formData.append("category", kategori);
    formData.append("map", map);
    formData.append("whatsapp", whatsapp);
    formData.append("instagram", instagram);
    formData.append("tiktok", tiktok);
    formData.append("facebook", facebook);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/umkm`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload berhasil:", response.data);
      alert("Data berhasil ditambahkan!");
      setOpenModal(false);
    } catch (error) {
      console.error("Error upload:", error);
      alert("Gagal mengunggah data.");
    }
  };

  let editClick = async (id) => {
    setOpenModal(true);
    await axios.get(`${import.meta.env.VITE_API_URL}/umkm/${id}`).then((data) => {
      setNama(data.data.namaUmkm || "");
      setDescription(data.data.description || "");
      setKategori(data.data.category || "");
      setMap(data.data.maps || "");
      setWhatsapp(data.data.whatsapp || "");
      setInstagram(data.data.instagram || "");
      setTiktok(data.data.tiktok || "");
      setFacebook(data.data.facebook || "");
    });
  };

  return (
    <>
      <main>
        <div className="p-5 flex flex-col gap-5">
          <Card>
            <div className="flex justify-between items-center">
              <h1 className=" font-bold">UMKM</h1>
              <Button
                className=" bg-gray-200 text-black"
                onClick={() => navigate("/admin/add")}
              >
                Tambah Data UMKM
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>Gambar</Table.HeadCell>
                  <Table.HeadCell>MAP</Table.HeadCell>
                  <Table.HeadCell>WA</Table.HeadCell>
                  <Table.HeadCell>IG</Table.HeadCell>
                  <Table.HeadCell>TT</Table.HeadCell>
                  <Table.HeadCell>FB</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {umkm.map((data, index) => (
                    <>
                      <Table.Row
                        key={data.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell>{data.namaUmkm}</Table.Cell>
                        <Table.Cell>
                          <img
                            className=""
                            src={`${import.meta.env.VITE_IMAGE}${data.image}`}
                            alt=""
                          />
                        </Table.Cell>
                        <Table.Cell>{data.maps}</Table.Cell>
                        <Table.Cell>{data.whatsapp}</Table.Cell>
                        <Table.Cell>{data.instagram}</Table.Cell>
                        <Table.Cell>{data.tiktok}</Table.Cell>
                        <Table.Cell>{data.facebook}</Table.Cell>
                        <Table.Cell>
                          <Button
                            className=" bg-gray-200 text-black"
                            onClick={() => navigate(`/admin/menu/${data.id}`)}
                          >
                            Tambah Daftar Menu
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-row justify-center items-center gap-3">
                            <Button
                              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              onClick={() => navigate(`/admin/update/${data.id}`)}
                            >
                              Update Menu
                            </Button>
                            <Button
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              onClick={() => deleteClick(data.id)}
                            >
                              Delete Menu
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Admin;
