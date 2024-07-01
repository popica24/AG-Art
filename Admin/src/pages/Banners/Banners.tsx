import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../utils/firebase";
import { Carousel } from "react-responsive-carousel";
import AddBanner from "./AddBanner";
import { FaUpload } from "react-icons/fa";
import Banner from "./Banner";
type Banner = {
  name: string;
  url: string;
};
const Banners = () => {
  const [banners, setBanners] = useState<Array<Banner> | undefined>(undefined);
  const [addBanner, setAddBanner] = useState(false);
  useEffect(() => {
    const bannersRef = ref(imageDb, "banners");

    listAll(bannersRef).then((bannersImages) => {
      const fetchBanners = bannersImages.items.map(async (bannerRef) => {
        const url = await getDownloadURL(bannerRef);
        return { name: bannerRef.name, url };
      });

      Promise.all(fetchBanners).then((resolvedBanners) => {
        setBanners(resolvedBanners.reverse());
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
      <h1 className="text-4xl font-thin my-8" data-aos="zoom-out">
        Bannere
      </h1>
      <div className="w-full">
        <Carousel showThumbs={true} showStatus={false}>
          {banners?.map((b) => {
            return (
              <div key={b.name}>
                <Banner url={b.url} name={b.name} />
              </div>
            );
          })}
        </Carousel>
      </div>
      <button
        onClick={() => setAddBanner(true)}
        className="text-[27px] inline-flex items-start bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        <FaUpload size={"30px"} className="me-3" /> Adauga Banner
      </button>
      {addBanner && <AddBanner handleClose={() => setAddBanner(false)} />}
    </div>
  );
};

export default Banners;
