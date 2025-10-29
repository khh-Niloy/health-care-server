import { prisma } from "../../lib/prisma";

const bookScheduleService = async (payload: any, user: any) => {
  const { schedulesIds } = payload;
  console.log(schedulesIds);
  const doctor = await prisma.doctor.findFirst({
    where: {
      email: user.email,
    },
  });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const doctorSchedules = schedulesIds.map((scheduleId: string) => ({
    doctorId: doctor.id,
    scheduleId,
  }));

  return await prisma.doctorSchedule.createMany({
    data: doctorSchedules
});

};

const myScheduleService = async (user: any) => {
  const doctor = await prisma.doctor.findFirst({
    where: {
      email: user.email,
    },
  });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctorId: doctor.id,
    },
  });
  return doctorSchedules;
};

export const doctorSchedulesService = {
  bookScheduleService,
  myScheduleService,
};
