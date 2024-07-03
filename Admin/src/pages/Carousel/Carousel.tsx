import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useCarousel } from "../../context/CarouselContext";
import { CarouselProps } from "../../utils/types";
import { CiEdit } from "react-icons/ci";
import { CgCheck, CgClose } from "react-icons/cg";

const Carousel = () => {
  const [items, setItems] = useState<Array<CarouselProps>>();
  const carousel = useCarousel();
  useEffect(() => {
    const fetchItems = async () => {
      const carouselItems = (await carousel?.getAll())?.data;

      if (carouselItems == null || carouselItems.length < 5) {
        return;
      }

      const photosRefs = await listAll(ref(imageDb, "carousel"));
      const photosPromises = photosRefs.items.map((photoRef) => {
        return getDownloadURL(photoRef);
      });

      const photos = await Promise.all(photosPromises);

      const tiles: Array<CarouselProps> = [];

      photos.map((photo, i) => {
        tiles.push({
          url: photo,
          name: carouselItems[i].name,
          id: carouselItems[i].id,
        });
      });

      setItems(tiles);
    };
    fetchItems();
  }, []);

  if (!items) return;

  return (
    <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
      <div className="flex flex-col justify-center items-center w-full container mx-auto">
        <h1
          className="text-4xl font-thin my-10 text-center"
          data-aos="zoom-out"
        >
          Carusel Orizontal
        </h1>
        <div className="flex flex-row items-center justify-center flex-wrap">
          <CarouselCard {...items[0]} />
          <CarouselCard {...items[1]} />
          <CarouselCard {...items[2]} />
          <CarouselCard {...items[3]} />
          <CarouselCard {...items[4]} />
        </div>
      </div>
    </div>
  );
};

const CarouselCard = (props: CarouselProps) => {
  const carousel = useCarousel();
  const [newPhoto, setNewPhoto] = useState<Blob | null>(null);
  const [header, setHeader] = useState(props.name);
  const [hover, setHover] = useState(false);
  const update = async () => {
    try {
      if (newPhoto !== null) {
        const photoRef = ref(imageDb, `carousel/${props.id}.jpg`);
        await uploadBytes(photoRef, newPhoto);
      }
      if (header !== props.name && header.trim() !== "") {
        const newHeader: CarouselProps = {
          id: props.id,
          name: header.trim(),
          url: props.url,
        };
        await carousel?.update(props.id, newHeader);
      }
    } catch (err: any) {
      toast.error("A aparut o eroare");
    }
  };

  return (
    <div
      className="flex flex-col items-center relative m-10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="md:h-[600px] h-auto aspect-[2/3] flex-shrink-0 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${
            newPhoto ? URL.createObjectURL(newPhoto) : props.url
          })`,
        }}
      >
        <div className="text-white text-[40px] header absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <input
            className="focus:border-0 focus:outline-0 bg-transparent text-[40px] z-40 text-white max-w-[300px] text-center relative drop-shadow-xl"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        {hover && newPhoto === null && (
          <div className="bg-gradient-to-b from-black/0 to-black absolute bottom-0 left-0 h-[250px] w-full">
            <div className="flex justify-center items-end h-full p-8">
              <label htmlFor="new_photo_input">
                <CiEdit
                  color="white"
                  size={"35px"}
                  className="cursor-pointer"
                />
              </label>
              <input
                type="file"
                className="hidden"
                id="new_photo_input"
                onChange={(e) => setNewPhoto(e.target.files![0])}
              />
            </div>
          </div>
        )}
        {(header !== props.name || newPhoto !== null) && (
          <div className="absolute bottom-4 right-4">
            <CgCheck size={"50px"} onClick={() => update()} />
          </div>
        )}
        {newPhoto !== null && (
          <div className="absolute bottom-6 right-20">
            <CgClose
              size={"30px"}
              className="cursor-pointer"
              onClick={() => setNewPhoto(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
{
  // <input
  //         className="focus:border-0 focus:outline-0 bg-transparent text-[40px] z-20 text-black"
  //         value={header}
  //         onChange={(e) => setHeader(e.target.value)}
  //       />
  /* <div
        className="md:h-[600px] h-auto aspect-[2/3] flex-shrink-0 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${
            newPhoto ? URL.createObjectURL(newPhoto) : props.url
          })`,
        }}
      ></div> */
}
