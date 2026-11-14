import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = db.getItemById(params.id);
  if (!item) {
    return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, item });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = db.updateItem(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = db.deleteItem(params.id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Dish deleted successfully" });
}
