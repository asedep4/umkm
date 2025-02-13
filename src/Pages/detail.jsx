import { Card, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import { FormatRupiah } from "@arismun/format-rupiah";

const Detail = () => {
const menu = [
 {
  image: "https://placehold.co/100x100",
  title: "Judul UMKM1",
  harga: 15000
 },
 {
  image: "https://placehold.co/100x100",
  title: "Judul UMKM1",
  harga: 15000
 },
 {
  image: "https://placehold.co/100x100",
  title: "Judul UMKM1",
  harga: 15000
 },
 {
  image: "https://placehold.co/100x100",
  title: "Judul UMKM1",
  harga: 15000
 }, 
]

  const [data, setData] = useState([]);

  const {id} = useParams()

  useEffect(() => {
    async function fetchData() {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm/${id}`);
    }

    fetchData().then((res) => {
      setData(res.data);
    })
    
    
    
  }, []);

  console.log(data)


  const Sosmed = [
    {
      id: 1,
      img: "/whatsapp.png",
      nama: "Whatsapp",
      link: data.whatsapp,
    },
    {
      id: 2,
      img: "/location.png",
      nama: "Maps",
      link: data.maps,
    },
    {
      id: 3,
      img: "/facebook.png",
      nama: "Facebook",
      link:data.facebook ,
    },
    {
      id: 4,
      img: "/instagram.png",
      nama: "instagram",
      link: data.instagram,
    },
    {
      id: 5,
      img: "/tiktok.png",
      nama: "tiktok",
      link: data.tiktok,
    },
  ];

  data.menu && data.menu.map((item) => {
    console.log(item)
  })


  
  return (
    <>
      <div className="h-56 sm:h-64 xl:h-[500px] 2xl:h-full">
        <Carousel className="" indicators="false">
          <div className="relative flex justify-center items-center">
            <img
              className="w-full"
              src={`${import.meta.env.VITE_IMAGE}${data.image}`}
              alt="foto makanan"
            />
          </div>
        </Carousel>
      </div>

      <main className="p-7 md:p-14 lg:p-28">
        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {data.namaUmkm}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {data.description}
        </p>

        <div className="mt-5 mx-12">
          <p>Lokasi dan Sosial Media</p>
          {Sosmed.map((item) => (
            item.link ? ( // Cek apakah link tidak null
              <a
                key={item.id}
                href={item.link}
                className="rounded-3xl mt-2 flex justify-start p-2 bg-gray-200 border border-gray-200 shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-start text-black">
                  <img src={item.img} className="h-7" alt="" />
                  <p className="ms-2">{item.nama}</p>
                </div>
              </a>
            ) : null 
            ))}
        </div>

        <div className="mt-5 md:mt-10">
          <h1 className="text-start">Daftar Menu</h1>
          <hr className="border-black" />
        </div>
        <div className="mt-3">
          <Swiper
            modules={[FreeMode, Navigation, Pagination, Scrollbar]}
            spaceBetween={30}
            slidesPerView={2}
            freeMode={true}
            // navigation
            // pagination={{ clickable: true }}
          >
            {data.menu?.map((item) => (
              <>
                <SwiperSlide key={item.id} className=" md:!w-[400px]">
                  <Card
                    // href={`/detail/${item.id}`}
                    className="w-full"
                    imgAlt="Gambar UMKM"
                    renderImage={() => {
                      return (
                        <div className="flex justify-center items-center relative w-full">
                          <img
                            className="h-[150px] w-[400px] sm:h-[300px] sm:w-[400] object-cover"
                            src={`${import.meta.env.VITE_IMAGE}${item.image}`}
                            alt=""
                          />
                        </div>
                      );
                    }}
                  >
                    <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.namaMakanan}
                    </h5>
                    
                    <FormatRupiah value={item.harga} />
                  </Card>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
      </main>
    </>
  );
};

export default Detail;
