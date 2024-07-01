import React, { useState, useEffect } from "react";

const AboutUs = () => {
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const pointX = 5100; // Replace with your desired scroll point
      console.log(scrollY);

      if (scrollY > pointX) {
        setShowSecondImage(true);
      } else {
        setShowSecondImage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center justify-evenly flex-col md:flex-row container p-20 mx-auto font-thin text-xl">
      <div className="flex flex-col text-center md:text-start uppercase leading-6">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        <span>
          Praesentium adipisci porro labore consequatur nobis possimus
        </span>
        <span>
          eveniet dolore voluptas illum fugit sed cupiditate! Iusto corporis
          labore non, ullam recusandae minus eum?
        </span>
      </div>
      {showSecondImage ? (
        <img
          src="/bulb-on.png"
          alt="Bulb turned off"
          className="w-[200px] my-8 md:my-0 md:mx-8"
        />
      ) : (
        <img
          src="/bulb-off.png"
          alt="Bulb turned off"
          className="w-[200px] mx-8 my-8 md:my-0"
        />
      )}
      <div className="flex flex-col text-center md:text-end uppercase leading-6">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        <span>
          Praesentium adipisci porro labore consequatur nobis possimus
        </span>
        <span>
          eveniet dolore voluptas illum fugit sed cupiditate! Iusto corporis
          labore non, ullam recusandae minus eum?
        </span>
      </div>
      {/* */}
    </div>
  );
};

export default AboutUs;

// <div className=" text-white ">
//   <div className="max-w-[90vmin] md:container mx-auto">
//     <h3 className="lg:ms-24 text-3xl font-thin my-4">Despre Noi</h3>
//   </div>
//   <div
//     className="mx-auto xl:h-[80vh] bg-cover bg-scroll xl:bg-fixed bg-center bg-no-repeat shadow-lg relative text-white overflow-hidden"
//     style={{
//       backgroundImage: "url(workshop.jpg)",
//     }}
//   >
//     <div className="xl:mt-40 my-12 lg:px-24 z-10">
//       <div className="container px-4 mx-auto">
//         <div className="font-medium text-xl md:text-2xl tracking-tight text-white bg-black w-fit p-2">
//           Lumina își Găsește Drumul: Workshop de Construcție a Lampilor
//         </div>

//         <p className="mt-4 leading-7 font-thin max-w-[54ch] bg-black w-fit p-2">
//           Descoperă arta creării propriilor tale lampi unice din lemn și
//           metal în cadrul acestui workshop interactiv.
//         </p>
//         <p className="mt-4 leading-7 font-thin max-w-[55ch] bg-black w-fit p-2">
//           Îndrumat de meșteri experimentați, vei explora tehnici de
//           prelucrare a materialelor și design creativ pentru a da viață
//           propriilor tale opere de artă luminoase.
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
