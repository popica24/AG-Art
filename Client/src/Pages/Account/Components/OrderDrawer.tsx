import { useEffect, useState } from "react";
import { Order } from "../../../Utils/types";
import { Drawer } from "@material-tailwind/react";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../../Utils/firebase";
import { ApplyPercentOff } from "../../../Utils/ApplyPercentOff";

type Props = {
  order: Order | null;
  isOpen: boolean;
  closeDrawer: () => void;
};

const OrderDrawer = (props: Props) => {
  const [photos, setPhotos] = useState<Array<string>>();

  const getPhoto = async (id: number) => {
    const photoRef = ref(imageDb, `${id}/hero.jpg`);
    const url = await getDownloadURL(photoRef);
    return url;
  };
  useEffect(() => {
    const fetchPhotos = async () => {
      if (props.order?.products) {
        const photoPromises = props.order.products.map((prod) =>
          getPhoto(prod.id)
        );
        const urls = await Promise.all(photoPromises);
        if (urls) {
          setPhotos(urls);
        }
      }
    };

    fetchPhotos();
  }, [props.order]);
  if (photos)
    return (
      <>
        {props.isOpen && (
          <div className="fixed inset-0 pointer-events-auto z-0 bg-black/50 backdrop-blur-sm"></div>
        )}
        <Drawer
          open={props.isOpen}
          onClose={props.closeDrawer}
          placement="bottom"
          className="p-4 z-40 text-black"
          overlay={false}
          size={500}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="container mx-auto lg:p-8 text-black overflow-y-scroll lg:max-h-none max-h-[400px]">
            <div className="flex flex-col lg:grid grid-cols-3 mb-12">
              <div className="col-span-1">
                <div className="flex flex-col items-start justify-center text-sm">
                  <span className="text-xl lg:text-3xl mb-2">
                    Detalii Livrare
                  </span>
                  <span>
                    {props.order?.shippingState}, {props.order?.shippingCity}
                  </span>
                  <span>
                    {props.order?.shippingAddress} -{" "}
                    {props.order?.shippingPostalCode}
                  </span>
                  <span className="lg:text-3xl mt-6 text-xl">
                    Detalii Facturare
                  </span>
                  <span>
                    {props.order?.billingState}, {props.order?.billingCity}
                  </span>
                  <span>
                    {props.order?.billingAddress} -{" "}
                    {props.order?.billingPostalCode}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-start justify-center">
                  <span className="lg:text-3xl mb-2 lg:mt-0 mt-6 text-xl">
                    Metoda Plată
                  </span>
                  <span>
                    {props.order?.paymentMethod == "Cash"
                      ? "Plată la livrare (Ramburs)"
                      : "Comanda platită deja (Card)"}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-start justify-center">
                  <span className="lg:text-3xl text-lg mt-6 lg:mt-0 mb-2">
                    Articole
                  </span>

                  <div className="flex flex-col overflow-y-scroll max-h-[300px]">
                    {props.order?.products.map((prod, i) => {
                      return (
                        <div className="flex flex-row items-start my-4 border w-full">
                          <img
                            src={photos?.[i]}
                            alt=""
                            className="aspect-square w-[90px] rounded-lg border border-black me-2"
                          />
                          <div className="flex flex-col items-start">
                            <span>
                              {prod.name} - {prod.variant}
                            </span>
                            {prod.percentOff > 0 ? (
                              <div className="inline-flex items-center">
                                RON
                                <s>{prod.price}</s>
                                <p>
                                  {ApplyPercentOff(prod.price, prod.percentOff)}
                                </p>
                              </div>
                            ) : (
                              <p>RON {prod.price}</p>
                            )}
                            <span>Cantitate x{prod.quantity}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </>
    );
};

export default OrderDrawer;
