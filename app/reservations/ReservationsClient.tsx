"use client";

import axios from "axios";
import { User, Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  currentUser: User | null;
  reservations: {
    id: string;
    userId: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    createdAt: Date;
    listing: Listing;
  }[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(error.message || "Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest Reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
