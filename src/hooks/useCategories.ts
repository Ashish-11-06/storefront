"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";

export function useCategories() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  return {
    categories: data?.allCategories || [],
    loading,
    error,
  };
}