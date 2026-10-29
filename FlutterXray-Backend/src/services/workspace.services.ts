import prisma from "../config/db";
export const createWorkspace = async (userId: string, name: string, description: string, isPublic: boolean) => {
    const newWorkspace = await prisma.workspace.create({
        data: {
            name,
            description,
            isPublic,
            userId


        }
    })
    return newWorkspace;
}
export const getWorkspacesByUserId = async (userId: string) => {
    const workspaces = await prisma.workspace.findMany({
        where: {
            userId: userId
        }
    })
    return workspaces;
}
export const getWorkspaceById = async (workspaceId: string, userId: string) => {
    const workspace = await prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            userId: userId,
        }
    })
}
export const updateWorkspace = async (workspaceId: string, userId: string, updateData: any) => {
    const existingWorkspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
            userId: userId
        }
    })
    if (!existingWorkspace) {
        throw new Error('Không tìm thấy bản vẽ hoặc bạn không có quyền sửa!');
    }
    const updatedWorkspace = await prisma.workspace.update({
        where: { id: workspaceId },
        data:
            updateData

    })
    return updatedWorkspace;
}