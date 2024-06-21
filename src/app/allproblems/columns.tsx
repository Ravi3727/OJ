"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Allproblems = {
  id: string;
  Title: string
  Tags: string[],
  Difficulty: string
}

export const columns: ColumnDef<Allproblems>[] = [
  {
    accessorKey: "Title",
    header: "Title",
  },
  {
    accessorKey: "Tags",
    header: "Tags",
  },
  {
    accessorKey: "Difficulty",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Difficulty
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const data:String = (row.getValue("Difficulty"))
        const formatted = data.toString();
    
        return <div className={`text-${formatted === "Easy" ? "green-500" : formatted === "Medium" ? "yellow-500" : "red-500"} font-medium`}>{formatted}</div>
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Allproblems = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Allproblems.id)}
            >
              Copy problem ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Allproblems.id)}
              className="text-yellow-500 hover:text-yellow-600"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Allproblems.id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



// cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("Difficulty"))
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)

//     return <div className="text-right font-medium">{formatted}</div>
//   },