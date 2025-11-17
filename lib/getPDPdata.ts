import fs from "fs"
import path from "path"

export function getPDPData() {
  const root = path.join(process.cwd(), "public", "files", "projektant-pdp")

  function readDirRecursive(dirPath: string): any {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    return entries.map((entry) => {
      const fullPath = path.join(dirPath, entry.name)

      if (entry.isDirectory()) {
        return {
          type: "folder",
          name: entry.name,
          children: readDirRecursive(fullPath),
        }
      }

      return {
        type: "file",
        name: entry.name,
        url: fullPath
          .split("public")
          .pop()
          ?.replace(/\\/g, "/"),
      }
    })
  }

  return readDirRecursive(root)
}
