import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { images } from "@/constants";

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#FE8C00" : "#777",
        }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: 12,
          color: focused ? "#FE8C00" : "#777",
          marginTop: 4,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          backgroundColor: "#fff",
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.home} title="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.search} title="Search" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.bag} title="Cart" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.person} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}