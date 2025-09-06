export const userKeys = {
	all: ["users"] as const,
	current: () => [...userKeys.all, "current"] as const,
  byId: (id: number | string) => [...userKeys.all, "byId", id] as const,
}