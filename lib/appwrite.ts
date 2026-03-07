import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

import {
  CreateUserParams,
  GetMenuParams,
  SignInParams,
  Category,
  MenuItem,
} from "@/type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.kc.foodOrdering",
  databaseId: "696c8ed700131595cfc6",
  bucketId: "69a9824600034e89ce43",
  userCollectionId: "user",
  categoriesCollectionId: "categories",
  menuCollectionId: "menu",
  customizationsCollectionId: "customizations",
  menuCustomizationsCollectionId: "menu_customizations",
};

import { useCartStore } from "@/store/cart.store";

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);


// CREATE USER
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newAccount) throw new Error("Account creation failed");

    // login after signup
    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
};


// SIGN IN
export const signIn = async ({ email, password }: SignInParams) => {
  try {

    // remove existing session if it exists
    try {
      await account.deleteSession("current");
    } catch {}

    const session = await account.createEmailPasswordSession(
      email,
      password
    );

    // load cart for this user
    const user = await account.get();
    await useCartStore.getState().setUserCart(user.$id);

    return session;

  } catch (e: any) {
    throw new Error(e.message);
  }
};


// LOGOUT
export const logout = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (e: any) {
    throw new Error(e.message);
  }
};


// GET CURRENT USER
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (e) {
    return null;
  }
};


// GET MENU
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menus.documents as unknown as MenuItem[];
  } catch (e: any) {
    throw new Error(e.message);
  }
};


// GET CATEGORIES
export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return categories.documents as unknown as Category[];
  } catch (e: any) {
    throw new Error(e.message);
  }
};