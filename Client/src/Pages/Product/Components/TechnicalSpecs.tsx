import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { removeHyphens } from "../../../Utils/RemoveHyphens";
import { Link } from "react-router-dom";
type Props = {
  category: string;
  dimensions: string;
  lightSource: string;
  material: string;
};

const TechnicalSpecs = (props: Props) => {
  const CATEGORY = removeHyphens(props.category) ?? ""
  const DISPLAY_CATEGORY = CATEGORY?.charAt(0).toUpperCase() + CATEGORY?.slice(1) 
    console.log(CATEGORY.charAt(0).toUpperCase() + CATEGORY.slice(1));
    
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  if(CATEGORY == ""){
    return <></>
  }
  return (
    <div className="flex flex-col justify-start container mx-auto px-8 text-white my-4 lg:my-6 font-thin">
      <span className="text-[30px] md:text-[40px] lg:text-[60px] mb-[70px] sm:mb-[100px] lg:mb-[150px]">
        Specificatii Tehnice
      </span>
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col">
          <span className="text-lg">Categorie</span>
          <Link to={`/${CATEGORY}`} className="text-base underline underline-offset-[6px]">
          {DISPLAY_CATEGORY}
          </Link>
          <span className="text-lg mt-10">Material</span>
          <span className="text-base">{props.material}</span>
        </div>
        <div className="flex flex-col mt-10 md:mt-0">
          <Accordion
            open={open == 1}
            className="w-[200px] md:w-[350px] border-t border-b"
            children={
              <>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  children={<span> Dimensiuni</span>}
                  className="text-white font-thin border-0 hover:text-gray-400"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                ></AccordionHeader>
                <AccordionBody>
                  <span className="text-white">{props.dimensions}</span>
                </AccordionBody>
              </>
            }
            placeholder={<></>}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          ></Accordion>
          <Accordion
            open={open == 2}
            className="w-[200px] md:w-[350px] border-b"
            children={
              <>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  children={<span> Sursa de lumina</span>}
                  className="text-white font-thin border-0 hover:text-gray-400"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                ></AccordionHeader>
                <AccordionBody>
                  <span className="text-white">{props.lightSource}</span>
                </AccordionBody>
              </>
            }
            placeholder={<></>}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          ></Accordion>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecs;
