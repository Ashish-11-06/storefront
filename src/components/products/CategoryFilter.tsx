"use client";

import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  selected: number[]; // 🔥 controlled from parent
  onChange: (selected: number[]) => void;
};

export default function CategoryFilter({ selected, onChange }: Props) {
  const { categories, loading } = useCategories();

  const toggleCategory = (id: number) => {
    let updated: number[];

    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id);
    } else {
      updated = [...selected, id];
    }

    onChange(updated); // 🔥 no local state
  };

  const clearFilters = () => {
    onChange([]);
  };

  if (loading) {
    return (
      <div className="border rounded-xl p-5 bg-white space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>

        {/* Categories list */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded-sm" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>

      </div>
    );
  }

  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">

      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Categories</h4>

        <button
          onClick={clearFilters}
          className="text-xs text-gray-500 hover:text-black"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat: any) => (
          <label
            key={cat.id}
            className="flex items-center gap-3 cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(Number(cat.id))} // 🔥 works with URL
              onChange={() => toggleCategory(Number(cat.id))}
              className="accent-black"
            />
            {cat.name}
          </label>
        ))}
      </div>

    </div>
  );
}