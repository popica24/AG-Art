import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../../Utils/firebase";
import { Variant } from "../../../Utils/types";
type Props = {
  id: number;
  name: string;
  variants: Variant[];
  price: number;
  percentOff: number | 0;
};

const ProductHero = (props: Props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const heroRef = ref(imageDb, `${props.id}/hero.jpg`);
    getDownloadURL(heroRef).then((url) => setImage(url));
  }, []);

  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="text-[40px] md:text-[40px] lg:text-[90px] font-thin container mx-auto px-8">
          {props.name}
        </h1>
        <div
          className="bg-center bg-cover w-full h-[800px]"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        <div className="container mx-auto px-8 my-8">
          {props.variants != null && props.variants.length > 0 ? (
            <ImageCarousel
              percentOff={props.percentOff}
              name={props.name}
              id={props.id}
              variants={props.variants}
              price={props.price}
            />
          ) : (
            <h2 className="text-center font-thin text-[12 px] md:text-[16px] lg:text-[36px] py-4">
              Produsul nu este disponibil pe magazin momentan
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductHero;
