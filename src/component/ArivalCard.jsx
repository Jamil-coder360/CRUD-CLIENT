import Image from "next/image";
import React from "react";
import arival_1 from "@/app/assets/arival_1.png";
import { IoIosStar } from "react-icons/io";

const ArivalCard = ({product}) => {
  return (
    <div className="max-w-[386px] px-6.25 pt-3.75 pb-9 rounded-xl shadow-xl">
      <div className="w-[336px] h-[244px]">
        <Image src={product.image} width={336} height={244} alt="New Arrival" className="w-full h-full rounded-[10px]" />
      </div>
      <div className="flex items-center justify-between pt-3">
        <div>
          <h3 className="text-[20px] font-medium text-heading">{product.name}</h3>
          <p className="text-[12px] leading-3 font-medium text-paragraph">
          {product.brand}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array(5)
            .fill()
            .map((_, i) => (
              <IoIosStar key={i} className="text-yellow-500" size={19} />
            ))}
        </div>
      </div>
      <h4 className="text-[12px] leading-3 font-medium text-heading pt-6.25">
        ({product.reviewCount}) Customer Reviews
      </h4>
      <div className="flex items-center justify-between pt-6.25">
        <strong className="tracking-[-1%] text-2xl font-medium text-heading">${product.price} </strong>
      <span className="text-[#FF4646] text-[12px] leading-5 font-normal" > {product.status} </span>
      </div>

    </div>
  );
};

export default ArivalCard;
