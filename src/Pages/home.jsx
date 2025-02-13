import { TextInput, Card } from "flowbite-react";


import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";

import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";

const Home = ({ setLoading }) => {
  const [makanan, setMakanan] = useState([]);
  const [minuman, setMinuman] = useState([]);
  const [jasa, setJasa] = useState([]);

  useEffect(() => {
    async function makanan() {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm/category/makanan`);
    }
    async function minuman() {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm/category/minuman`);
    }

    async function jasa() {
      return await axios.get(`${import.meta.env.VITE_API_URL}/umkm/category/jasa`);
    }
    makanan().then((res) => {
      setMakanan(res.data);
    });

    minuman().then((res) => {
      setMinuman(res.data);
    });

    jasa().then((res) => {
      setJasa(res.data);
    });
    // setMakanan();
  }, []);

  const [loading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (loading) {
    return (
      <div className="relative flex justify-center items-center h-screen bg-[url(/BGloadingBIG.png)] bg-cover bg-center bg-no-repeat">
        <div>
          <Card className="mx-4 rounded-2xl h-20">
            <div className="flex flex-row items-center">
              <img
                src="/umkm_ungu.png"
                alt="Loading..."
                className="w-20 h-20"
              />
              <h1 className="text-2xl">Selamat Datang</h1>
              <img src="/logo_kkn.png" alt="Loading..." className="w-20 h-18" />
            </div>
          </Card>
          <h2 className="mt-6 text-white">
            UMKM <br /> KELURAHAN PESANTREN
          </h2>
          <img
            src="/people_purpel.png"
            alt="Gambar Kelompok KKN"
            className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 sm:h-[430px]  lg:h-[450px]"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="p-7 md:p-14 lg:p-28">
        <div className="">
          <TextInput className="rounded-xl" placeholder="Makanan" />
        </div>

        <div className="mt-5 md:mt-10">
          <h1 className="text-start">Makanan</h1>
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
            {makanan.map((item) => (
              <>
                <SwiperSlide key={item.id} className=" md:!w-[400px]">
                  <Card
                    href={`/detail/${item.id}`}
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
                      {item.namaUmkm}
                    </h5>
                    <p className="max-sm:truncate font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
                    {/* <FormatRupiah value={item.harga} /> */}
                  </Card>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>

        <div className="mt-5 md:mt-10">
          <h1 className="text-start">Minuman</h1>
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
            {minuman.map((item) => (
              <>
                <SwiperSlide className=" md:!w-[400px]">
                  <Card
                    href={`/detail/${item.id}`}
                    className=" w-full"
                    imgAlt="Gambar UMKM"
                    renderImage={() => {
                      return (
                        <div className="flex justify-center items-center relative w-full">
                          <img
                            className="h-[150px] w-[400px] sm:h-[300px] sm:w-[400] object-cover"
                            src={`${import.meta.env.IMAGE}${item.image}`}
                            alt=""
                          />
                        </div>
                      );
                    }}
                  >
                    <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.namaUmkm}
                    </h5>

                    <p className="max-sm:truncate font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
                  </Card>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>

        <div className="mt-5 md:mt-10">
          <h1 className="text-start">Jasa</h1>
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
            {jasa.map((item) => (
              <>
                <SwiperSlide className=" md:!w-[400px]">
                  <Card
                    href={`/detail/${item.id}`}
                    className=" w-full"
                    imgAlt="Gambar UMKM"
                    // imgSrc={item.image}
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
                      {item.namaUmkm}
                    </h5>
                    <p className="max-sm:truncate font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
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

export default Home;
