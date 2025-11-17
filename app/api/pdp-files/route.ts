import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function listAll(prefix = ""): Promise<any[]> {
  const { data, error } = await supabase.storage
    .from("projektant-pdp")
    .list(prefix, { limit: 1000 });

  if (error) {
    console.error("Supabase list error:", error.message);
    return [];
  }

  const result: any[] = [];

  for (const item of data) {
    const fullPath = prefix ? `${prefix}/${item.name}` : item.name;

    if (!item.metadata) {
      const children = await listAll(fullPath);
      result.push({
        type: "folder",
        name: item.name,
        children,
      });
    } else {
      result.push({
        type: "file",
        name: item.name,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projektant-pdp/${fullPath}`,
      });
    }
  }

  return result;
}

export async function GET() {
  const files = await listAll("");
  return Response.json(files);
}
