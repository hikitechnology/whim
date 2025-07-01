import { getUserById } from "@/placeholder/users";
import { useLocalSearchParams } from "expo-router";

import Card from "@/components/Card";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import IconText from "@/components/IconText";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UserProfile() {
  const params = useLocalSearchParams<{ id: string }>();
  const user = getUserById(parseInt(params.id));

  if (!user) {
    return <Text>User doesn&apos;t exist</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.innerContainer}
    >
      <Card innerStyle={styles.card}>
        {user.mutualFriends > 0 ? (
          <View style={styles.badge}>
            <Badge
              backgroundColor="#dbeafe"
              textColor="#1d4ed8"
              variant="large"
            >
              {user.mutualFriends} mutual friend
              {user.mutualFriends > 1 && "s"} 💫
            </Badge>
          </View>
        ) : null}
        <View style={styles.userOverview}>
          <View style={styles.pfp} />
          <Text style={styles.name}>{user.name}</Text>
          <IconText
            icon="location-outline"
            iconColor="#d97706"
            style={styles.location}
          >
            {user.location}
          </IconText>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
        <View style={styles.interactions}>
          <Button variant="primary" icon="hand-left-outline">
            Wave
          </Button>
          <Button icon="chatbubble-outline">Chat</Button>
        </View>
      </Card>
      {user.numPictures && user.numPictures > 0 ? (
        <Card innerStyle={[styles.card]}>
          <IconText
            icon="camera-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            My Pics
          </IconText>
          <FlatList
            data={new Array(user.numPictures)}
            renderItem={() => <View style={styles.pic} />}
            horizontal
            style={{ overflow: "visible" }}
            contentContainerStyle={styles.pictureScroll}
            showsHorizontalScrollIndicator={false}
          />
        </Card>
      ) : null}
      {user.interests && user.interests.length > 0 ? (
        <Card innerStyle={[styles.card]}>
          <IconText
            icon="star-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            Things I Love
          </IconText>
          <View style={styles.interests}>
            {user.interests.map((item, index) => (
              <Badge
                key={index}
                variant="large"
                backgroundColor="#f3e8ff"
                textColor="#7e22ce"
              >
                {item}
              </Badge>
            ))}
          </View>
        </Card>
      ) : null}
      {user.traits && user.traits.length > 0 ? (
        <Card innerStyle={[styles.card]}>
          <IconText
            icon="sparkles-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            My Vibe
          </IconText>
          <View style={styles.blurbsList}>
            {user.traits.map((item, index) => (
              <View
                key={index}
                style={[styles.blurbItem, { backgroundColor: "#eff6ff" }]}
              >
                <Text style={[styles.blurbHeader, { color: "#1e40af" }]}>
                  {item.name}
                </Text>
                <Text style={[styles.blurbBody, { color: "#1d4ed8" }]}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      ) : null}
      {user.favorites && user.favorites.length > 0 ? (
        <Card innerStyle={styles.card}>
          <IconText
            icon="heart-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            Current Favorites
          </IconText>
          <View style={styles.blurbsList}>
            {user.favorites.map((item, index) => {
              // random icons/colors for now
              const icons = [
                "book-outline",
                "musical-notes-outline",
                "pizza-outline",
                "beer-outline",
                "tennisball-outline",
              ] as const;
              const colors = [
                "#059669",
                "#dc2626",
                "#1d4ed8",
                "#a21caf",
                "#0e7490",
              ];

              const randomIcon =
                icons[Math.floor(Math.random() * icons.length)];
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];

              return (
                <View key={index} style={styles.favoriteRow}>
                  <Ionicons name={randomIcon} color={randomColor} size={21} />
                  <View>
                    <Text style={styles.blurbHeader}>{item.category}</Text>
                    <Text style={[styles.blurbBody, { color: "#4b5563" }]}>
                      {item.favorite}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>
      ) : null}
      {user.lookingFor ? (
        <Card innerStyle={styles.card}>
          <IconText
            icon="search-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            Looking For
          </IconText>
          <Text style={styles.cardText}>{user.lookingFor}</Text>
        </Card>
      ) : null}
      {user.conversationStarters && user.conversationStarters.length > 0 ? (
        <Card innerStyle={styles.card}>
          <IconText
            icon="chatbubble-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            Let&apos;s Talk About...
          </IconText>
          <View style={styles.blurbsList}>
            {user.conversationStarters.map((item, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={[styles.blurbItem, { backgroundColor: "#ecfdf5" }]}
                >
                  <Text style={[styles.blurbBody, { color: "#064e3b" }]}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      ) : null}
      {user.favoriteLocations && user.favoriteLocations.length > 0 ? (
        <Card innerStyle={styles.card}>
          <IconText
            icon="compass-outline"
            iconColor="#d97706"
            style={styles.cardHeader}
          >
            You Might Find Me At...
          </IconText>
          <View style={styles.interests}>
            {user.favoriteLocations.map((item, index) => (
              <Badge
                key={index}
                variant="large"
                backgroundColor="#ffedd5"
                textColor="#9a3412"
              >
                {item}
              </Badge>
            ))}
          </View>
        </Card>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbeb",
  },
  innerContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 16,
    gap: 14,
  },
  userOverview: {
    gap: 6,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 999,
  },
  interactions: {
    flexDirection: "row",
    height: 40,
    gap: 10,
  },
  pfp: {
    width: 90,
    height: 90,
    backgroundColor: "#eaeaea",
    borderRadius: 999,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  location: {
    fontSize: 18,
    fontWeight: 500,
    color: "#374151",
  },
  bio: {
    fontSize: 18,
    color: "#374151",
    textAlign: "center",
  },
  cardHeader: {
    fontSize: 22,
    fontWeight: 600,
  },
  pictureScroll: {
    gap: 10,
    overflow: "visible",
  },
  pic: {
    width: 124,
    height: 124,
    backgroundColor: "#eaeaea",
    borderRadius: 20,
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  blurbsList: {
    gap: 10,
  },
  blurbItem: {
    padding: 14,
    borderRadius: 14,
  },
  blurbHeader: {
    fontSize: 18,
    fontWeight: 500,
  },
  blurbBody: {
    fontSize: 18,
  },
  favoriteRow: {
    flexDirection: "row",
    gap: 4,
    paddingLeft: 3,
  },
  cardText: {
    fontSize: 18,
    color: "#374151",
  },
});
