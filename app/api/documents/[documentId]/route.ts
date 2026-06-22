import { deleteFromBlob } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ documentId: string }>;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> },
) {
  try {
    const { documentId } = await context.params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get document with organization information
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        organization: {
          include: {
            members: {
              where: {
                user: { clerkUserId: userId },
              },
            },
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    if (document.organization.members.length === 0) {
      return NextResponse.json(
        { error: "You do not have permission to delete this document" },
        { status: 403 },
      );
    }

    // Delete file from Vercel Blob if exists
    if (document.fileUrl) {
      try {
        await deleteFromBlob(document.fileUrl);
      } catch (error) {
        console.error("Error deleting file from Vercel Blob:", error);
      }
    }

    // Delete document from database
    await prisma.document.delete({
      where: { id: documentId },
    });

    return NextResponse.json(
      { success: true, message: "Document deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 },
    );
  }
}
