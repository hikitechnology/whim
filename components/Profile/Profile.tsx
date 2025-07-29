import { UserProfile as UserProfileType } from "@/types/UserProfile";
import Card from "../Card";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import IconText from "@/components/IconText";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageBackground from "@/components/PageBackground";
import CardHeader from "@/components/CardHeader";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Href, useRouter } from "expo-router";
import { useConnectionState } from "@/hooks/useConnections";

type Props = {
  profile: UserProfileType;
  editPagePath: Href;
};

export default function Profile({ profile, editPagePath }: Props) {
  const router = useRouter();
  const user = useAuthenticatedUser();
  const isOwnProfile = profile.uid === user.uid;
  const metAt = useConnectionState(
    (state) =>
      state.connections.find((conn) => conn.uid === profile.uid)?.locationName,
  );

  return (
    <PageBackground>
      <Card>
        <View style={styles.userOverview}>
          <View style={styles.pfp} />
          <Text style={styles.name}>{profile.name}</Text>
          {metAt ? (
            <IconText
              icon="location-outline"
              iconColor="#d97706"
              style={styles.location}
            >
              Met near {metAt}
            </IconText>
          ) : null}
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
        {!isOwnProfile ? (
          <View style={styles.interactions}>
            <Button
              variant="primary"
              icon="hand-left-outline"
              style={{ flex: 1 }}
            >
              Wave
            </Button>
            <Button icon="chatbubble-outline" style={{ flex: 1 }}>
              Chat
            </Button>
          </View>
        ) : (
          <Button onPress={() => router.navigate(editPagePath)}>
            Edit Profile
          </Button>
        )}
      </Card>
      {profile.interests &&
      profile.interests.length > 0 &&
      profile.interests.some((item) => item !== "") ? (
        <Card>
          <CardHeader icon="star-outline">Things I Love</CardHeader>
          <View style={styles.interests}>
            {profile.interests.map((item, index) => (
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
      {profile.traits &&
      profile.traits.length > 0 &&
      profile.traits.some(
        (item) => item.trait !== "" || item.description !== "",
      ) ? (
        <Card>
          <CardHeader icon="sparkles-outline">My Vibe</CardHeader>
          <View style={styles.blurbsList}>
            {profile.traits.map((item, index) => (
              <View
                key={index}
                style={[styles.blurbItem, { backgroundColor: "#eff6ff" }]}
              >
                <Text style={[styles.blurbHeader, { color: "#1e40af" }]}>
                  {item?.trait}
                </Text>
                <Text style={[styles.blurbBody, { color: "#1d4ed8" }]}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      ) : null}
      {profile.favorites &&
      profile.favorites.length > 0 &&
      profile.favorites.some(
        (item) => item.item !== "" || item.category !== "",
      ) ? (
        <Card>
          <CardHeader icon="heart-outline">Current Favorites</CardHeader>
          <View style={styles.blurbsList}>
            {profile.favorites.map((item, index) => {
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
                      {item.item}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>
      ) : null}
      {profile.lookingFor ? (
        <Card>
          <CardHeader icon="search-outline">Looking For</CardHeader>
          <Text style={styles.cardText}>{profile.lookingFor}</Text>
        </Card>
      ) : null}
      {profile.conversationStarters &&
      profile.conversationStarters.length > 0 &&
      profile.conversationStarters.some((item) => item !== "") ? (
        <Card>
          <CardHeader icon="chatbubble-outline">
            Let&apos;s Talk About...
          </CardHeader>
          <View style={styles.blurbsList}>
            {profile.conversationStarters.map((item, index) => (
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
    </PageBackground>
  );
}

const styles = StyleSheet.create({
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
    height: 44,
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
