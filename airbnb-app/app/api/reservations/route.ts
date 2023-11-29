import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // Check if the selected time range is available
  const existingReservations = await prisma.reservation.findMany({
    where: {
      listingId,
      startDate: { lte: endDate },
      endDate: { gte: startDate },
    },
  });

  if (existingReservations.length > 0) {
    // Time range is not available
    return NextResponse.json(
      {
        error: 'Selected time range is not available.',
      },
      { status: 400 },
    );
  }

  // Time range is available, proceed with creating the reservation
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
