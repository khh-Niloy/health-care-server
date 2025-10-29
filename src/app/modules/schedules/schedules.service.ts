import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../lib/prisma";
import pick from "../../utils/pick";
import { Prisma } from "@prisma/client";

const createSchedule = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  let schedules = [];

  while (currentDate <= lastDate) {
    const startTimeDate = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]) // 11:00
        ),
        Number(endTime.split(":")[1])
      )
    );

    // breaking into slots

    while (startTimeDate <= endDateTime) {
      const slotStartDateTime = startTimeDate; // 10:00
      const slotEndDateTime = addMinutes(startTimeDate, intervalTime); // 10:30

      const scheduleData = {
        startDate: slotStartDateTime,
        endDate: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      slotStartDateTime.setMinutes(
        slotStartDateTime.getMinutes() + intervalTime
      );
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};

const getScheduleService = async (query: Record<string, string>, user: any) => {
  const filter = pick(query, ["startTime", "endTime"]);
  const options = pick(query, ["page", "limit", "sortBy", "sortOrder"]);

  const andCondition: Prisma.ScheduleWhereInput[] = [];

  const { startTime: filterStartDateTime, endTime: filterEndDateTime } = filter;

  if (filterStartDateTime && filterEndDateTime) {
    andCondition.push({
      AND: [
        {
          startDate: {
            gte: filterStartDateTime,
          },
        },
        {
          endDate: {
            lte: filterEndDateTime,
          },
        },
      ],
    });
  }

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "asc";

  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const whereConditions: Prisma.ScheduleWhereInput =
    andCondition.length > 0
      ? {
          AND: andCondition,
        }
      : {};

  const bookedSchedules = await prisma.doctorSchedule.findMany();
  const notToShowSchedules = bookedSchedules.map(
    (schedule) => schedule.scheduleId
  );

  const result = await prisma.schedule.findMany({
    skip: skip,
    take: limit,
    where: {
      ...whereConditions,
      id: {
        notIn: notToShowSchedules,
      },
    },
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.schedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const deleteScheduleFromDB = async (id: string) => {
  return await prisma.schedule.delete({
    where: {
      id,
    },
  });
};

export const schedulesService = {
  createSchedule,
  getScheduleService,
  deleteScheduleFromDB,
};
