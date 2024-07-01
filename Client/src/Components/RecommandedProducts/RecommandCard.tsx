import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { imageDb } from "../../Utils/firebase";
import { ApplyPercentOff } from "../../Utils/ApplyPercentOff";

type Props = {
  id: number | undefined;
  name: string | undefined;
  price: string | undefined;
  colors: string[] | undefined;
  percentOff: number | undefined;
};

const RecomandCard = (props: Props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const imagePath = `${props.id}/hero.png`;
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
            <p className="w-[45vmin] sm:w-[125px] md:w-[175px] lg:w-[195px] xl:w-[266.53px] aspect-square">
              <Skeleton className="max-w-[45vmin] sm:max-w-[125px] md:max-w-[175px] lg:max-w-[195px] xl:max-w-[266.53px] rounded-lg h-full" />
            </p>
          </SkeletonTheme>
        </>
      )}
      <div className="p-2 max-w-[45vmin] sm:max-w-[400px] md:max-w-[195px] lg:max-w-[195px] xl:max-w-[400px]">
        {props.name ? (
          <h5 className="font-thin max-w-[10ch]">{props.name}</h5>
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
            <div className="inline-flex items-center">
              <s className="text-[#fee4ca] text-[10px]">{props.price} RON</s>
              <p className="text-[#fee4ca] ms-2">
                {ApplyPercentOff(Number(props.price), Number(props.percentOff))}
                RON
              </p>
            </div>
          </>
        ) : (
          <p className="text-[#fee4ca]">
            {props.price}
            RON
          </p>
        )}
        <div className="flex flex-row">
          {props.colors ? (
            props.colors.map((c, i) => {
              return (
                <div
                  className="p-3 me-2 rounded-md"
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
export default RecomandCard;
