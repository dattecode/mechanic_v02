import z from "zod";
import { extractData } from "../../common/utils/extractData.js";

const repairsSchema = z.object({
  date: z
    .string({
      invalid_type_error: "date format is incorrect",
      required_error: "date is required",
    })
    .min(7, "date is too short")
    .max(12, "date is too long"),
  motorsNumber: z
    .string({
      invalid_type_error: "motorsNumber format is incorrect",
      required_error: "motorsNumber is required",
    })
    .max(18, "date is too long"),
  description: z
    .string({
      invalid_type_error: "description format is incorrect",
      required_error: "description is required",
    })
    .max(200, "description is too long"),
  userId: z.string({
    invalid_type_error: "userId format is incorrect",
    required_error: "userId is required",
  }),
});

export function validateRepair(data) {
  const result = repairsSchema.safeParse(data);
  const { hasError, errorMessage, data: userData } = extractData(result);
  return {
    hasError,
    errorMessage,
    userData,
  };
}

export const validateRepairPartial = (data) => {
  const result = repairsSchema.partial().safeParse(data);
  const { hasError, errorMessage, data: userData } = extractData(result);
  return {
    hasError,
    errorMessage,
    userData,
  };
};
