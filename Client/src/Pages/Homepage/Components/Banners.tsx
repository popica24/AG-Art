import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../../Utils/firebase";
import { Carousel } from "react-responsive-carousel";

const Banners = () => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<Array<string> | undefined>(undefined);
  useEffect(() => {
    const bannersRef = ref(imageDb, "banners");

    listAll(bannersRef).then((bannersImages) => {
      const fetchBanners = bannersImages.items.map(async (bannerRef) => {
        const url = await getDownloadURL(bannerRef);
        return url;
      });

      Promise.all(fetchBanners).then((resolvedBanners) => {
        setBanners(resolvedBanners.reverse());
      });
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div className="w-full h-[450px] bg-cover bg-center z-40"></div>;
  }
  if (!banners || (banners.length == 0 && !loading)) {
    return (
      <div
        className="w-full h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(hero.webp)` }}
      ></div>
    );
  }
  return (
    <div className="z-40">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoFocus={true}
        autoPlay={true}
        infiniteLoop={true}
      >
        {banners?.map((b) => {
          return (
            <div key={b}>
              <div
                className="w-full h-[450px] bg-cover bg-center"
                style={{ backgroundImage: `url(${b})` }}
              ></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banners;
