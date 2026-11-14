import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const vegOnly = searchParams.get("veg") === "true";
    const featured = searchParams.get("featured") === "true";

    let items = db.getItems();

    if (category && category !== "all") {
      items = items.filter((i) => i.categoryId === category);
    }
    if (vegOnly) {
      items = items.filter((i) => i.isVeg);
    }
    if (featured) {
      items = items.filter((i) => i.isFeatured);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.categoryName.toLowerCase().includes(q)
      );
    }

    const categories = db.getCategories();

    return NextResponse.json({
      success: true,
      items,
      categories,
    });
  } catch (error) {
    console.error("GET /api/menu error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: "Name, price and category are required" },
        { status: 400 }
      );
    }

    const newItem = db.createItem({
      name: body.name,
      description: body.description || "",
      categoryId: body.categoryId,
      categoryName: body.categoryName || body.categoryId,
      price: Number(body.price),
      image:
        body.image ||
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
      isVeg: Boolean(body.isVeg),
      spicyLevel: body.spicyLevel ?? 1,
      isPopular: Boolean(body.isPopular),
      isFeatured: Boolean(body.isFeatured),
      isAvailable: body.isAvailable !== false,
      rating: body.rating || 5.0,
      reviewsCount: body.reviewsCount || 1,
      prepTime: body.prepTime || "15-20 mins",
      calories: body.calories || "450 kcal",
      sizes: body.sizes || [],
      addOns: body.addOns || [],
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error("POST /api/menu error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
