"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { getPDPData } from "@/lib/getPDPdata";
import { motion } from "framer-motion"

// -------------------- Typy --------------------
interface Node {
  type: 'folder' | 'file';
  name: string;
  url?: string;
  children?: Node[];
}

function Category({ node }: { node: Node }) {
  if (node.type !== 'folder') return null;
  return (
    <div className="mb-8">
      <h2 className="text-center text-2xl font-extrabold mb-4 text-orange-500">{node.name}</h2>
      <div className="space-y-4 border-l-3 border-gray-700 pl-4">
        {node.children?.map((model, i) => <Model key={i} node={model} />)}
      </div>
    </div>
  )
}
// -------------------- Komponent wrapper --------------------
export function CatalogWrapper() {
  const [data, setData] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const nodes = await getPDPData();
      setData(nodes);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
<div className="flex flex-col items-center justify-center h-64">
  <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-300 rounded-full animate-spin"></div>
  <p className="mt-4 text-gray-500">Ładowanie katalogu...</p>
</div>
    );
    return (
      <motion.div
          key="catalog"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Catalog data={data} />
        </motion.div>
    );
}

// -------------------- Twój aktualny komponent Catalog --------------------
const modelDescriptions: Record<string, string> = {
  "AFU": "Jednostka filtrująca powietrze",
  "ARC": "System filtrowentylacji schronu",
  "BVNC": "Zawory przeciwwybuchowe standardowe",
  "BVNO": "Zawory przeciwwybuchowe wzmocnione",
  "SAFE360": "System bezpiecznej filtracji CBRN",
  "DU-I": "Drzwi gazoszczelne, odporne wybuchy",
  "DU-III": "Drzwi zawiasowe przeciwwybuchowe",
  "DU-IV": "Drzwi wytrzymałe mechanicznie",
  "SU-IV": "Właz szczelny, odporny na eksplozje"
};

export function Catalog({ data }: { data: Node[] }) {
  const half = Math.ceil(data.length / 2)
  const firstCol = data.slice(0, half)
  const secondCol = data.slice(half)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>{firstCol.map((node, i) => <Category key={i} node={node} />)}</div>
      <div>{secondCol.map((node, i) => <Category key={i} node={node} />)}</div>
    </div>
  )
}


function Model({ node }: { node: Node }) {
  if (node.type !== 'folder') return null

  const [open, setOpen] = useState(false)
  const folders = node.children?.filter(c => c.type === 'folder') || []
  const files = node.children?.filter(c => c.type === 'file') || []

  const groupedFiles = groupFilesBySize(files)

  return (
    <div className="ml-6 mb-6 border-gray-700 pl-4">
      <div
  className={`flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-md transition-all duration-300 hover:bg-gray-100 hover:shadow-sm ${open ? "bg-gray-200!" : ""}`}
  onClick={() => setOpen(!open)}
>
  <ChevronRight
    className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${open ? 'rotate-90 text-orange-500' : 'rotate-0'}`}
  />
  <h3 className="text-xl font-semibold text-black">{node.name}</h3>
  {modelDescriptions[node.name] && (
    <p className="text-xs text-muted-foreground mt-1 ml-2 mx-2">- {modelDescriptions[node.name]}</p>
  )}
</div>
      
      {open && (
        <>
          {groupedFiles.map((submodel, i) => (
            <SubModel key={i} node={submodel} />
          ))}

          {folders.length > 0 && (
            <div className="space-y-2 mt-2">
              {folders.map((subfolder, i) => (
                <SubModel key={i} node={subfolder} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}


function SubModel({ node }: { node: Node }) {
  if (node.type !== 'folder') return null

  const folders = node.children?.filter(c => c.type === 'folder') || []
  const files = node.children?.filter(c => c.type === 'file') || []

  return (
    <div className="ml-6 mb-4 flex justify-between border-b-5">
      <h4 className="font-medium mb-1">{node.name}</h4>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1 my-4">
          {files.map((file, i) => {
            const ext = file.name.split('.').pop()?.toLowerCase()
            const typeLabel = ext === 'dwg' ? 'DWG' : ext === 'rvt' ? 'RVT' : ext?.toUpperCase() || 'FILE'

            return (
              <a
                key={i}
                href={file.url}
                download
                className="w-16 px-3 py-1 rounded-md bg-accent text-center text-accent-foreground text-xs font-medium hover:bg-accent/90 transition"
              >
                {typeLabel}
              </a>
            )
          })}
        </div>
      )}

      {folders.length > 0 && (
        <div className="space-y-2 mt-3 border-l border-gray-700 pl-4">
          {folders.map((sub, i) => (
            <SubModel key={i} node={sub} />
          ))}
        </div>
      )}
    </div>
  )
}


function groupFilesBySize(files: Node[]): Node[] {
  const map: Record<string, Node[]> = {}

  files.forEach(file => {
    const match = file.name.match(/(\d{2,4}[xх]\d{2,4})/)
    const size = match ? match[1] : ''

    if (!map[size]) map[size] = []
    map[size].push(file)
  })

  return Object.entries(map).map(([size, files]) => ({
    type: 'folder' as const,
    name: size,
    children: files
  }))
}
