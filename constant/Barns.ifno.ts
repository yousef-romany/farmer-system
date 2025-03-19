import db from "@/lib/db";

export const createBarnOne = async (
  barns_number: number,
  barns_name: string,
  capactiy: number,
  create_at: string
) => {
  const query =
    "INSERT INTO `barns` (`barns_number`, `barns_name`, `capactiy`, `create_at`) VALUES (?, ?, ?, ?);";
  try {
    const rows = await (
      await db
    ).execute(query, [barns_number, barns_name, capactiy, create_at]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateBarnOne = async (
  barns_number: number,
  barns_name: string,
  capactiy: number,
  id: number
) => {
  const query = "UPDATE `barns` SET `barns_number`= ?, `barns_name`= ?, `capactiy`= ? WHERE `id`= ?;";
  try {
    const rows = await (
      await db
    ).execute(query, [barns_number, barns_name, capactiy, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBarnList = async () => {
  const query =
    "SELECT barns.*, COUNT(livestock.id) AS busy_amount FROM barns LEFT JOIN livestock ON livestock.barn_id = barns.id GROUP BY barns.id;";
  try {
    const rows = await (await db).select(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBarnOne = async () => {};

export const deleteBarnOne = async (id: number) => {
  const query = "DELETE FROM barns WHERE id = ?";
  try {
    const rows = await (await db).execute(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
