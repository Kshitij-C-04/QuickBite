# 🍔 QuickBite – Food Ordering Mobile App

QuickBite is a modern **food ordering mobile application** built using **React Native with Expo** and powered by **Appwrite** as the backend service for authentication, database, and storage.

The application allows users to browse food items, view details, customize meals with add-ons, manage a cart, and place orders in a clean and intuitive mobile interface.

This project demonstrates how to build a **full-stack mobile application** using modern technologies like React Native, Expo Router, and Appwrite.

---

# 📱 App Preview

QuickBite is designed with a clean UI similar to modern food delivery apps such as Swiggy and Zomato.

Main features include:

* User authentication
* Browse food categories
* Food item details
* Add-ons / customizations
* Cart management
* Profile management
* Backend powered by Appwrite

---

# 🚀 Tech Stack

### Frontend

* **React Native**
* **Expo**
* **Expo Router**
* **TypeScript**
* **NativeWind (Tailwind CSS for React Native)**
* **Zustand (State Management)**

### Backend

* **Appwrite**

Appwrite is an open-source **Backend as a Service (BaaS)** that provides authentication, database, storage, and APIs for building applications quickly. ([GitHub][1])

### Other Tools

* Git & GitHub
* Expo Go
* EAS (Expo Application Services)

---

# ✨ Features

## 🔐 Authentication

Users can securely create an account and log in using email and password.

Authentication is handled using **Appwrite Account API** which manages sessions and user data securely.

Features include:

* User signup
* Login with email and password
* Session management
* Logout functionality

---

## 🍽 Browse Menu

Users can explore different food items available in the application.

Each menu item displays:

* Name
* Image
* Price
* Description
* Calories
* Protein
* Rating

---

## 🧩 Customization / Add-ons

Food items can include **optional add-ons** such as extra cheese, sauce, or toppings.

Users can select or deselect add-ons which dynamically updates the total price.

The customization system is powered by relational data in the Appwrite database.

Database structure:

```
Menu
   ↓
Menu_Customizations
   ↓
Customizations
```

This structure allows flexible mapping between food items and available add-ons.

---

## 🛒 Cart System

Users can add items to the cart with selected add-ons.

Cart features:

* Add item to cart
* Remove item
* Update quantity
* Calculate total price dynamically

The cart state is managed using **Zustand** for lightweight global state management.

---

## 👤 User Profile

The profile section allows users to:

* View profile information
* Update name and email
* Logout
* Display dynamic avatar

User avatars are generated using **Appwrite Avatars API**.

---

# 🗂 Project Structure

```
QuickBite
│
├── app/
│   ├── (auth)            # Authentication screens
│   ├── (tabs)            # Main tab navigation
│   │   ├── home
│   │   ├── search
│   │   ├── cart
│   │   └── profile
│
├── components/           # Reusable UI components
├── constants/            # Images, static data
├── lib/                  # Appwrite configuration
├── store/                # Zustand state management
├── assets/               # Icons and images
├── types/                # TypeScript types
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🗄 Database Design (Appwrite)

Collections used in Appwrite:

### Users

Stores user information.

Fields:

* name
* email
* accountId
* avatar

---

# ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Kshitij-C-04/QuickBite.git
```

### Navigate into the project

```bash
cd QuickBite
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npx expo start
```

Scan the QR code using **Expo Go** to run the app on your mobile device.

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

---

# 🧠 Learning Outcomes

This project demonstrates:

* Building cross-platform mobile apps with React Native
* Using Expo for rapid development
* Implementing authentication and database with Appwrite
* Managing global state using Zustand
* Designing scalable mobile UI architecture
* Working with relational database structures
* Integrating backend APIs in mobile applications

---

# 🚀 Future Improvements

Possible enhancements:

* Payment integration
* Order history
* Real-time order tracking
* Push notifications
* Restaurant management dashboard
* Dark mode support

---

# 👨‍💻 Author

**Kshitij Chaware**

GitHub:
https://github.com/Kshitij-C-04

---

# ⭐ Support

If you like this project, consider giving it a **star on GitHub** ⭐
