const Footer = () => {
  return (
    <footer className="bg-[#000106] text-white font-extralight">
      <div className="container mx-auto lg:p-24 md:px-6 md:pb-[7rem] pb-[5rem] px-5">
        <div className="border-b border-[#424242] md:mb-[40px] pb-4 mb-4 md:pb-0">
          <img
            src="/LOGO.jpg"
            alt=""
            width={60}
            height={78}
            className="md:pb-[20px]"
          />
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex flex-col items-start justify-center w-full">
            <div className="flex flex-col md:flex-row">
              <span className="border-b mb-2 md:mb-0 w-fit">Contact</span>
              <span className="md:ms-4 border-b mb-2 md:mb-0">
                Politica de confidențialitate
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:mt-2 border-b md:border-0 w-full border-[#424242]">
              <span className="border-b mb-2 md:mb-0 w-fit">
                Politica de cookies
              </span>

              <span className="md:mx-4 border-b mb-2 md:mb-0 w-fit">
                Termeni și condiții
              </span>
              <span className="border-b mb-2 md:mb-0 w-fit">
                Formular de retur
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start text-lg mt-2 mb-8 md:mb-0">
            <span className="text-sm uppercase md:mb-8">Adresa noastră</span>
            <span>NET COURSE SCHOOL s.r.l</span>
            <span>I.C. BRATIANU, 24</span>
            <span>+40 758 065 509</span>
            <span className="border-b">contact@agart.com</span>
            <div className="flex flex-col md:flex-row items-start md:items-center md:mt-8">
              <a className="border-b" href="">
                Facebook
              </a>
              <a href="" className="md:mx-4 border-b">
                Instagram
              </a>
              <a className="border-b" href="">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
