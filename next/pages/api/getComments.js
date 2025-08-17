import { supabase } from "../../utils/supabase/client";

export default async function handler(req, res) {
  const { id } = req.body;

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("project_id", id)
    .order("id", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  console.log(data);
  return res.status(200).json({ data });
}
