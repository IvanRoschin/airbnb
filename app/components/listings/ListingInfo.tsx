"use client";

import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { User } from "@prisma/client";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: User | null;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;

  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
        text-xl
        font-semibold
        flex
        flex-row
        items-center
        gap-2"
        >
          <div className="">Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
        flex 
        flex-row
        items-center
        gap-4
        text-light
        text-neutral-500"
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
