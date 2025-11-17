"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface Node {
  type: 'folder' | 'file';
  name: string;
  url?: string;
  children?: Node[];
}

interface CatalogColumnsProps {
  data: Node[];
}

export function Catalog({ data }: CatalogColumnsProps) {
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

function Category({ node }: { node: Node }) {
  if (node.type !== 'folder') return null

  return (
    <div className="mb-8">
      <h2 className="text-center text-2xl font-extrabold mb-4 text-orange-500">{node.name}</h2>
      <div className="space-y-4 border-l-3 border-gray-700 pl-4">
        {node.children?.map((model, i) => <Model key={i} node={model} />)}
      </div>
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
        className="flex items-center gap-2 cursor-pointer mb-2"
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
        />
        <h3 className="text-xl font-semibold text-black">{node.name}</h3>
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
