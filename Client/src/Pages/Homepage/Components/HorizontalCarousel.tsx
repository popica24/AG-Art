import axios from "axios";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../../Utils/firebase";
import { Link } from "react-router-dom";

type CarouselProps = {
  url: string;
} & CarouselResult;

type CarouselResult = {
  id: number;
  name: string;
  productId: number;
};

const HorizontalCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [items, setItems] = useState<Array<CarouselProps>>();

  useEffect(() => {
    const fetchItems = async () => {
      const carouselItems: Array<CarouselResult> = (
        await axios.get(import.meta.env.VITE_API_URL + "/carousel")
      ).data;

      const photosRefs = await listAll(ref(imageDb, "carousel"));
      const photosPromises = photosRefs.items.map((photosRef) => {
        return getDownloadURL(photosRef);
      });
      const photos = await Promise.all(photosPromises);

      const items: Array<CarouselProps> = [];

      photos.map((photo, i) => {
        items.push({
          url: photo,
          name: carouselItems[i].name,
          id: carouselItems[i].id,
          productId: carouselItems[i].productId,
        });
      });

      setItems(items);
      setLoading(false);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY - 502);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the translation based on scroll position
  const translateX = -Math.min(4000, scrollPosition);

  if (loading) return;
  if (!items || items.length == 0) return;
  return (
    <>
      <h2
        className="text-center text-2xl font-thin uppercase my-6 md:my-0"
        data-aos="fade-up"
      >
        Produse de referință
      </h2>
      <div className="scroll-horizontal-section">
        <div className="md:h-[4500px] relative scroll-horizontal">
          <div className="scroll-horizontal__wrap flex sticky top-[110px] md:overflow-hidden overflow-x-auto">
            <div className="scroll-horizontal__content flex">
              <Link
                to={"/product/" + items[0].productId}
                className="md:h-[75vh] h-auto w-[90vmin] ms-[430px] md:w-auto aspect-[2/3] flex-shrink-0 me-20 md:ms-[99vw] bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  transform: `translateX(${translateX}px)`,
                  backgroundImage: `url(${items[0].url})`,
                }}
              >
                <div className="absolute h-full w-full top-0 left-0 opacity-25 bg-black dark-shade overflow-hidden" />
                <span className="z-10 header text-white text-[40px]">
                  {items[0].name}
                </span>
              </Link>
              <Link
                to={"/product/" + items[1].productId}
                className="md:h-[75vh] h-auto w-[90vmin] md:w-auto aspect-[2/3] flex-shrink-0 me-20 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  transform: `translateX(${translateX}px)`,
                  backgroundImage: `url(${items[1].url})`,
                }}
              >
                <div className="absolute h-full w-full top-0 left-0 opacity-25 bg-black dark-shade overflow-hidden" />
                <span className="z-10 header text-white text-[40px]">
                  {items[1].name}
                </span>
              </Link>
              <Link
                to={"/product/" + items[2].productId}
                className="md:h-[75vh] h-auto w-[90vmin] md:w-auto aspect-[2/3] flex-shrink-0 me-20 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  transform: `translateX(${translateX}px)`,
                  backgroundImage: `url(${items[2].url})`,
                }}
              >
                <div className="absolute h-full w-full top-0 left-0 opacity-25 bg-black dark-shade overflow-hidden" />
                <span className="z-10 header text-white text-[40px]">
                  {items[2].name}
                </span>
              </Link>
              <Link
                to={"/product/" + items[3].productId}
                className="md:h-[75vh] h-auto w-[90vmin] md:w-auto aspect-[2/3] flex-shrink-0 me-20 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  transform: `translateX(${translateX}px)`,
                  backgroundImage: `url(${items[3].url})`,
                }}
              >
                <div className="absolute h-full w-full top-0 left-0 opacity-25 bg-black dark-shade overflow-hidden" />
                <span className="z-10 header text-white text-[40px]">
                  {items[3].name}
                </span>
              </Link>
              <Link
                to={"/product/" + items[4].productId}
                className="md:h-[75vh] h-auto w-[90vmin] md:w-auto aspect-[2/3] flex-shrink-0 me-20 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  transform: `translateX(${translateX}px)`,
                  backgroundImage: `url(${items[4].url})`,
                }}
              >
                <div className="absolute h-full w-full top-0 left-0 opacity-25 bg-black dark-shade overflow-hidden" />
                <span className="z-10 header text-white text-[40px]">
                  {items[4].name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalCarousel;
