import db from "@/lib/db";

export const createWeightOne = async (
  liveStock_id: number,
  weight: number,
  net_weight: number,
  comment: string,
  create_at: string
) => {
  const query =
    "INSERT INTO `weights` (`liveStock_id`, `weight`, `net_weight`, `comment`, `create_at`) VALUES (?, ?, ?, ?, ?);";
  try {
    const rows = await (
      await db
    ).execute(query, [liveStock_id, weight, net_weight, comment, create_at]);
    await updateWeightInLiveStockTable(weight, liveStock_id);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateWeightOne = async (
  barns_number: number,
  barns_name: string,
  capactiy: number,
  id: number
) => {
  const query =
    "UPDATE `weight` SET `barns_number`= ?, `barns_name`= ?, `capactiy`= ? WHERE `id`= ?;";
  try {
    const rows = await (
      await db
    ).execute(query, [barns_number, barns_name, capactiy, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeightList = async () => {
  const query =
    "SELECT weights.*, barns.barns_name, livestock.idintifer_number FROM livestock RIGHT JOIN barns ON livestock.barn_id = barns.id RIGHT JOIN weights ON livestock.id = weights.liveStock_id;";
  try {
    const rows = await (await db).select(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWeightOne = async (weight: number, id: number) => {
  const query = "DELETE FROM weights WHERE id = ?";
  try {
    const rows = await (await db).execute(query, [id]);
    await updateWeightInLiveStockTable(weight, id);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateWeightInLiveStockTable = async (
  weight: number,
  id: number
) => {
  const query = "UPDATE `livestock` SET `weight`= ? WHERE `id`= ?;";
  try {
    const rows = await (await db).execute(query, [weight, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeightOne = async (liveStock_id: number) => {
  const query = "SELECT * FROM weights WHERE liveStock_id = ?";
  try {
    const rows = await (await db).select(query, [liveStock_id]);
    
    return rows;
  } catch (error) {
    console.log(error);
  }
};
