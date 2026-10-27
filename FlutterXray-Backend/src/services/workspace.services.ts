import prisma from "../config/db";
export const createWorkspace = async (userId: string, name: string, description: string, isPublic: boolean) => {
    const newWorkspace = prisma.workspace.create({
        data: {
            name,
            description,
            isPublic,
            userId


        }
    })
    return newWorkspace;
}