import { ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";
import dummyData from "./data";

/* ---------------- TYPES ---------------- */

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

/* ---------------- CLEAR COLLECTION ---------------- */

async function clearAll(collectionId: string) {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  for (const doc of list.documents) {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      collectionId,
      doc.$id
    );
  }
}

/* ---------------- SEED FUNCTION ---------------- */

async function seed() {
  try {
    console.log("🚀 Seeding database...");

    /* -------- CLEAR OLD DATA -------- */

    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationsCollectionId);
    await clearAll(appwriteConfig.menuCollectionId);
    await clearAll(appwriteConfig.menuCustomizationsCollectionId);

    console.log("🧹 Old data cleared");

    /* -------- CREATE CATEGORIES -------- */

    const categoryMap: Record<string, string> = {};

    for (const cat of data.categories) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        ID.unique(),
        {
          name: cat.name,
          description: cat.description,
        }
      );

      categoryMap[cat.name] = doc.$id;
    }

    console.log("✅ Categories seeded");

    /* -------- CREATE CUSTOMIZATIONS -------- */

    const customizationMap: Record<string, string> = {};

    for (const cus of data.customizations) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.customizationsCollectionId,
        ID.unique(),
        {
          name: cus.name,
          price: cus.price,
          type: cus.type,
        }
      );

      customizationMap[cus.name] = doc.$id;
    }

    console.log("✅ Customizations seeded");

    /* -------- CREATE MENU ITEMS -------- */

    const menuMap: Record<string, string> = {};

    for (const item of data.menu) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: item.image_url, // storing direct image url
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: categoryMap[item.category_name],
        }
      );

      menuMap[item.name] = doc.$id;

      /* -------- MENU CUSTOMIZATIONS -------- */

      for (const cusName of item.customizations) {
        if (!customizationMap[cusName]) continue;

        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCustomizationsCollectionId,
          ID.unique(),
          {
            menu: doc.$id,
            customizations: customizationMap[cusName],
          }
        );
      }
    }

    console.log("✅ Menu items seeded");

    console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

export default seed;