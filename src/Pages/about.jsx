// import { Button } from "flowbite-react";
// import { IconCaretLeftFilled } from "@tabler/icons-react";

const About = () => {
  return (
    <>
      <main className="relative">
        <div className="p-3">
          <h1 className="text-2xl">KKN-T Pesantren</h1>
          <div className="flex flex-row justify-between mx-auto mb-20">
            <img
              className="h-48 sm:h-60 mx-auto md:h-64 lg:h-80"
              src="/umkm_ungu.png"
              alt="logo umkm"
            />
            <img
              className="h-48 sm:h-60 mx-auto md:h-64 lg:h-80"
              src="/logo_kkn.png"
              alt="logo umkm"
            />
          </div>

          <img
            src="/people_normal.png"
            alt="gambar kkn"
            className="absolute bottom-[200px] sm:bottom-[140px] sm:w-[500px] lg:bottom-[100px] lg:w-[550px] left-1/2 transform -translate-x-1/2 w-full"
          />
        </div>
        <div className="text-white bg-[#7c458c]">
          <h1 className="pt-40 font-bold">KKN-T 41 UNP KEDIRI</h1>
          <p className="mt-3 pb-5 lg:px-20">
          Kami adalah KKNT Pesantren 41 UNP Kediri yang berkomitmen mendukung ekonomi pesantren melalui digitalisasi UMKM. Dengan inovasi dan kolaborasi, kami memberdayakan UMKM pesantren agar lebih kompetitif di era digital, meningkatkan akses pasar, efisiensi, dan daya saing produk lokal.
          </p>
        </div>
      </main>
    </>
  );
};

export default About;
