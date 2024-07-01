import {
  StorageReference,
  getDownloadURL,
  listAll,
  ref,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { imageDb } from "../../../Utils/firebase";
import { Carousel } from "react-responsive-carousel";
import { useCart } from "../../../Contexts/ShoppingCartContext";
import { Variant } from "../../../Utils/types";

type Props = {
  id: number | undefined;
  price: number | undefined;
  variants: Variant[];
  name: string | undefined;
  percentOff: number;
};

type ImageLibraryItem = {
  index: number;
  urls: string[] | undefined;
};
const ImageCarousel = (props: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [shadow, setShadow] = useState(props.variants[index].colorCode || 0);
  const [thumbnailLibrary, setThumbnailLibrary] = useState<Array<string>>([]);
  const [imageLibrary, setImageLibrary] =
    useState<(ImageLibraryItem | null)[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Helper function to fetch URLs for thumbnails
    const fetchThumbnails = async () => {
      try {
        const urls = await Promise.all(
          props.variants.map(async (v) => {
            const thumbnailRef = ref(
              imageDb,
              `${props.id}/variants/${v.name}/nuance.jpg`
            );
            return getDownloadURL(thumbnailRef);
          })
        );
        setThumbnailLibrary(urls);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    // Helper function to fetch URLs for tiles
    const fetchTileUrls = async (tilesRef: StorageReference) => {
      try {
        const tileRefs = await listAll(tilesRef);
        return Promise.all(
          tileRefs.items
            .filter((tileRef) => tileRef.name !== "nuance.jpg")
            .map((tileRef) => getDownloadURL(tileRef))
        );
      } catch (error) {
        console.error("Error fetching URLs for tiles:", error);
        return [];
      }
    };

    // Helper function to fetch tiles
    const fetchTiles = async () => {
      try {
        let index = 0; // Initialize index to 0
        const tilesRef = ref(imageDb, `${props.id}/variants`);
        const tilesList = await listAll(tilesRef);

        const tiles = await Promise.all(
          tilesList.prefixes.map(async (item) => {
            const urls = await fetchTileUrls(item);
            if (urls.length > 0) {
              const result: ImageLibraryItem = { index, urls };
              index++;

              return result;
            }
            return null;
          })
        );

        // Filter out null values (tiles with empty URL arrays)
        return tiles.filter((tile) => tile !== null);
      } catch (error) {
        console.error("Error fetching tiles:", error);
        return [];
      }
    };

    // Main data fetching function
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting data fetch
      try {
        await fetchThumbnails();
        const tiles = await fetchTiles();
        setImageLibrary(tiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    // Call fetchData only when props.variants and props.id change
    if (props.variants && props.id) {
      fetchData();
    }
  }, [props.variants, props.id]);

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    setShadow(props.variants[newIndex].colorCode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <img src="/loading.gif" width={80} className="h-auto" />
      </div>
    );
  }

  if (
    !imageLibrary ||
    !thumbnailLibrary ||
    imageLibrary.length == 0 ||
    thumbnailLibrary.length == 0
  ) {
    return (
      <h2 className="text-center font-thin text-[12 px] md:text-[16px] lg:text-[36px] py-4">
        Produsul nu este disponibil pe magazin momentan
      </h2>
    );
  }

  return (
    <>
      <h2 className="text-center font-thin text-[24px] md:text-[32px] lg:text-[72px] py-4">
        Culori disponibile
      </h2>
      <div
        className="flex flex-col-reverse lg:grid grid-cols-2 gap-x-2 shadow-2xl transition-shadow"
        style={{ boxShadow: `0px 0px 34px 8px ${shadow}` }}
      >
        <div className="col-span-1">
          <Carousel
            onChange={(i) => handleIndexChange(i)}
            showThumbs={false}
            showStatus={false}
          >
            {thumbnailLibrary.map((v, i) => {
              return (
                <CarouselItem
                  path={v}
                  key={i}
                  variant={props.variants[index]}
                  id={props.id!}
                  price={props.price!}
                  name={props.name!}
                  percentOff={props.percentOff}
                />
              );
            })}
          </Carousel>
        </div>
        <div className="col-span-1 -mb-3">
          <CarouselTiles index={index} variants={imageLibrary!} />
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;

type CarouselItemProps = {
  id: number;
  path: string;
  variant: Variant;
  price: number;
  name: string;
  percentOff: number;
};
const CarouselItem = (props: CarouselItemProps) => {
  const { increaseCartQuantity } = useCart();
  const handleAddToCart = async () => {
    const imageRef = ref(imageDb, `${props.id}/hero.jpg`);
    const imagePath = await getDownloadURL(imageRef);
    increaseCartQuantity({
      id: props.id,
      variant: props.variant.name,
      imagePath,
      price:
        props.percentOff > 0
          ? Number(props.price) - (props.percentOff * Number(props.price)) / 100
          : Number(props.price),
      oldPrice: Number(props.price),
      name: props.name,
    });
  };
  return (
    <>
      <div
        className="bg-center bg-cover aspect-[4/3]"
        style={{
          backgroundImage: `url(${props.path})`,
        }}
        aria-label="Nuanta culoare"
      ></div>
      <button
        onClick={handleAddToCart}
        className="legend inline-flex items-center justify-center"
      >
        {props.percentOff ? (
          <div className="text-base">
            {props.variant.name} -{" "}
            {Number(props.price) -
              (props.percentOff * Number(props.price)) / 100}{" "}
            RON
          </div>
        ) : (
          <div className="text-base">
            {props.variant.name} - {props.price} RON
          </div>
        )}

        <svg
          className="ms-2"
          fill="#FFFFFF"
          height="16px"
          width="16px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 483.1 483.1"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6 c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3 C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1 c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
    </>
  );
};

type CarouselTilesProps = {
  index: number;
  variants: (ImageLibraryItem | null)[];
};
const CarouselTiles = (props: CarouselTilesProps) => {
  const [fadeIn] = useState<boolean>(true);
  useEffect(() => {}, [props.index]);
  return (
    <div className="grid grid-cols-2 gap-x-2">
      <div className="col-span-1">
        <div
          className={`flex flex-col items-center justify-center ${
            fadeIn ? "fade-in" : "fade-out"
          }`}
        >
          <ImageTile
            path={`${
              props.variants[props.index]?.urls?.[0] ?? "/notfound.jpg"
            }`}
          />
          <ImageTile
            path={`${
              props.variants[props.index]?.urls?.[1] ?? "/notfound.jpg"
            }`}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div
          className={`flex flex-col items-center justify-center ${
            fadeIn ? "fade-in" : "fade-out"
          }`}
        >
          <ImageTile
            path={`${
              props.variants[props.index]?.urls?.[2] ?? "/notfound.jpg"
            }`}
          />
          <ImageTile
            path={`${
              props.variants[props.index]?.urls?.[3] ?? "/notfound.jpg"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

type ImageTileProps = {
  path: string | null;
};
const ImageTile = (props: ImageTileProps) => {
  if (props.path == "undefined")
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton className="w-full h-[231px] bg-center bg-cover aspect-[4/3] image-tile" />
      </SkeletonTheme>
    );
  return (
    <div
      aria-label="Image with selected nuance"
      style={{
        backgroundImage: `url(${props.path})`,
      }}
      className="mb-1.5 w-full h-auto bg-center bg-cover aspect-[4/3] bg-no-repeat image-tile"
    />
  );
};
