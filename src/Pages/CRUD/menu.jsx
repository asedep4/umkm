import {
  Card,
  Label,
  FileInput,
  TextInput,
  Radio,
  Button,
  Table,
} from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

import { FormatRupiah } from "@arismun/format-rupiah";
import { useEffect, useState } from "react";
import axios from "axios";



const Menu = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();   
  let navigate = useNavigate();
  
  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      localStorage.getItem("login") === "false"
    ) {
      navigate("/", { replace: true });
    }

    let getData = async () => {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm/menu/${id}`);
    }
    getData().then((data) =>{
      setData(data.data);
    } );

  }, []);


  const handleDelete = async (idMenu) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/menu?id=${idMenu}`).then(() => {
      alert("Data berhasil dihapus");
      window.location.reload();
    })
  }
  

  

  return (
    <>
      <main className="p-3 my-10 sm:mx-32 lg:mx-60">
        <Card>
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Daftar Menu</h1>
            <Button
              className=" bg-gray-200 text-black"
              onClick={() => navigate(`/admin/menu/add/${id}`)}
            >
              Tambah Data Menu
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Menu</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Harga</Table.HeadCell>
                <Table.HeadCell>Kategori</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">

              {data.menu?.map((item, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{item.namaMakanan}</Table.Cell>
                <Table.Cell>
                  <img
                    className=""
                    src={`${import.meta.env.VITE_IMAGE}${item.image}`}
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>
                  <FormatRupiah value={item.harga} />
                </Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row justify-center items-center gap-3">
                    <Button
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => navigate(`/admin/menu/update/${item.id}`)}
                    >
                      Update Menu
                    </Button>
                    <Button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete Menu
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
              ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </main>
    </>
  );
};

export default Menu;
