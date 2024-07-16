import { Drawer } from "@material-tailwind/react";

type Props = {
  isOpen: boolean;
  closeCatalogue: () => void;
};

const MobileDrawer = (props: Props) => {
  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 pointer-events-auto z-10 bg-black/50 backdrop-blur-sm"></div>
      )}
      <Drawer
        open={props.isOpen}
        onClose={props.closeCatalogue}
        placement="bottom"
        className="p-4 z-10"
        size={500}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col text-black">
          <span className="text-xl">Corpuri de iluminat</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/pendule"}>Pendule</a>
            </li>
            <li>
              <a href={"/lampadare-de-podea"}>Lampadare de podea</a>
            </li>
            <li>
              <a href={"/lampi-de-masa"}>Lampi de masa</a>
            </li>
            <li>
              <a href={"/abajururi-din-lemn"}>Abajururi din lemn</a>
            </li>
            <li>
              <a href={"/aplice-de-perete"}>Pendule</a>
            </li>
          </ul>
          <span className="text-xl">Accesorii</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/becuri"}>Becuri</a>
            </li>
          </ul>
          <span className="text-xl">Decoratiuni interioare</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/tablouri-din-lemn"}>Tablouri din lemn</a>
            </li>
            <li>
              <a href={"/articole-sezoniere"}>Articole sezoniere</a>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
