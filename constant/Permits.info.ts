import db from "@/lib/db";

export const createPermitsOne = async (
  type: "buy" | "sale" | "expense" | "deposit",
  category: "drug" | "animal" | "food" | "setting" | "else",
  comment: string,
  amount: string,
  create_at: string
) => {
  const query =
    "INSERT INTO `permits` (`type`, `category`, `comment`, `amount`, `relation_liveStock`, `create_at`) VALUES (?, ?, ?, ?, ?, ?);";
  try {
    const rows = await (
      await db
    ).execute(query, [type, category, comment, amount, 0, create_at]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updatePermitsOne = async (
  type: string,
  category: string,
  comment: string,
  amount: number,
  create_at: string,
  id: number
) => {
  const query =
    "UPDATE `permits` SET `type`= ?, `category`= ?, `comment`= ?, `amount`= ?, `create_at`= ? WHERE `id`= ?;";
  try {
    const rows = await (
      await db
    ).execute(query, [type, category, comment, amount, create_at, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPermitsList = async () => {
  const query = "SELECT * FROM permits;";
  try {
    const rows = await (await db).select(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPermitsOne = async () => {};

export const deletePermitsOne = async (id: number) => {
  const query = "DELETE FROM permits WHERE id = ?";
  try {
    const rows = await (await db).execute(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
