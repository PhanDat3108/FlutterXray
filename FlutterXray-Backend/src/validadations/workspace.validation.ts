import { z } from "zod";
export const createWorkspaceSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Ten ban ve khong duoc trong").max(100, 'Tên bản vẽ quá dài!'),
        description: z.string().optional(),
        isPublic: z.boolean().optional()
    })
})