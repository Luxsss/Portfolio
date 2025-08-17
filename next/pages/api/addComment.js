import { supabase } from "../../utils/supabase/client";

export default async function handler(req, res) {
  const { name, comment, id} = req.body;

  const { data, error } = await supabase
    .from('comments')
    .insert([
      { name: name, comment: comment, project_id: id },
    ])
    .select()

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  console.log(data);
  return res.status(200).json({ data });
}
