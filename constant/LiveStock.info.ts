import db from "@/lib/db";

export const createLiveStockOne = async (
  idintifer_number: number,
  type: string,
  age: number,
  weight: number,
  barn_id: number,
  create_at: string,
  status: "normal" | "under_eye"
) => {
  const query =
    "INSERT INTO `livestock` (`idintifer_number`, `type`, `age`, `weight`, `barn_id`, `create_at`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?);";

  try {
    const rows = await (
      await db
    ).execute(query, [
      idintifer_number,
      type,
      age,
      weight,
      barn_id,
      create_at,
      status,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLiveStockList = async () => {
  const query =
    "SELECT livestock.*, barns.barns_name FROM livestock INNER JOIN barns ON livestock.barn_id = barns.id;";
  try {
    const rows = await (await db).select(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateLiveStockOne = async (
  idintifer_number: number,
  type: string,
  age: number,
  weight: number,
  barn_id: number,
  create_at: string,
  status: "normal" | "under_eye",
  id: number
) => {
  const query = "UPDATE `livestock` SET `idintifer_number`= ?, `type`= ?, `age`= ?, `weight`= ?, `barn_id`= ?, `create_at`= ?, `status`= ? WHERE `id`= ?;";
  try {
    const rows = await (
      await db
    ).execute(query, [
      idintifer_number,
      type,
      age,
      weight,
      barn_id,
      create_at,
      status,
      id,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLiveStockOne = async (id: number) => {
  const query = "DELETE FROM livestock WHERE id = ?";
  try {
    const rows = await (await db).execute(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLiveStockOne = async () => {};
