import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonProductCard = () => {
  return (
    <>
      <div className="grid place-content-center w-max">
        <SkeletonTheme baseColor="#252525 " highlightColor="#444">
          <div className="flex items-center justify-center">
            <Skeleton
              containerClassName="flex-1"
              className="max-w-[90vmin] sm:max-w-[400px] md:max-w-[320px] lg:max-w-[320px] xl:max-w-[400px] rounded-lg md:h-[318px] lg:h-[318px] h-[300px]"
            />
          </div>
        </SkeletonTheme>

        <div className="p-2 max-w-[90vmin] sm:max-w-[400px] md:max-w-[320px] lg:max-w-[320px] xl:max-w-[400px]">
          <SkeletonTheme baseColor="#252525 " highlightColor="#444">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        </div>
      </div>
    </>
  );
};

export default SkeletonProductCard;
