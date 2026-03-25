export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error("GraphQL Error");
  }

  return json.data;
}