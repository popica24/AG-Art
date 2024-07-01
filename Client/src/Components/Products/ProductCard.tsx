import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../Utils/firebase";
import { ApplyPercentOff } from "../../Utils/ApplyPercentOff";

type Props = {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  colors: string[] | undefined;
  percentOff: number | undefined;
};

const ProductCard = (props: Props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const imagePath = `${props.id}/hero.jpg`;
    const imageRef = ref(imageDb, imagePath);
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  }, [props.id]);

  return (
    <Link
      className="bg-black text-white relative product__card"
      to={"/product/" + props.id}
    >
      {image ? (
        <div className="product_img_wrapper relative">
          <div
            className="w-[90vmin] sm:w-[250px] md:w-[300px] lg:w-[320px] xl:w-[391.53px] aspect-square rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="product__overlay__hover" />
          <div className="product__eye__hover">
            <div className="bg-[#F7EDE3] absolute-center p-2 rounded-lg hover:bg-[#f7dfc7] transition-colors">
              <img src="eye.svg" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p className="w-[90vmin] sm:w-[250px] md:w-[300px] lg:w-[320px] xl:w-[391.53px] aspect-square">
              <Skeleton className="max-w-[90vmin] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[391.53px] rounded-lg h-full" />
            </p>
          </SkeletonTheme>
        </>
      )}
      <div className="p-2 max-w-[90vmin] sm:max-w-[400px] md:max-w-[320px] lg:max-w-[320px] xl:max-w-[400px]">
        {props.name ? (
          <h5 className="font-thin">{props.name}</h5>
        ) : (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {" "}
            <Skeleton />
          </SkeletonTheme>
        )}
        {props.price && props.percentOff === 0 && (
          <div>
            <span className="text-[#fee4ca]">{props.price} RON</span>
          </div>
        )}

        {props.price && props.percentOff && props.percentOff > 0 ? (
          <>
            {" "}
            <div className="inline-flex">
              <s className="text-[#fee4ca]">{props.price} RON</s>
              <p className="text-[#fee4ca]">
                {ApplyPercentOff(props.price, props.percentOff)}
                RON
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-row">
          {props.colors ? (
            props.colors.map((c, i) => {
              return (
                <div
                  className="p-4 me-2 rounded-md border"
                  style={{ backgroundColor: c }}
                  key={i}
                ></div>
              );
            })
          ) : (
            <>
              <p>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton height={32} width={32} className="me-2" />
                </SkeletonTheme>
              </p>
              <p>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton height={32} width={32} className="me-2" />
                </SkeletonTheme>
              </p>
              <p>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton height={32} width={32} className="me-2" />
                </SkeletonTheme>
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
