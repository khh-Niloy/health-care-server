import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../lib/prisma";

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

export const schedulesService = {
  createSchedule,
};
