import { StyleSheet, View } from "react-native";
import Card from "../Card";
import React, { PropsWithChildren, ReactElement } from "react";
import ProfilePic from "./ProfilePic";
import Name from "./Name";
import Subtext from "./Subtext";
import Badge from "./Badge";
import Blurb from "./Blurb";

export default function UserCard({ children }: PropsWithChildren) {
  let profilePic: ReactElement | null = null;
  let name: ReactElement | null = null;
  let subtexts: ReactElement[] = [];
  let badge: ReactElement | null = null;
  let blurb: ReactElement | null = null;
  let otherChildren: ReactElement[] = [];

  console.log("rendering user card");

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      switch (child.type) {
        case ProfilePic:
          profilePic = child;
          break;
        case Name:
          name = child;
          break;
        case Subtext:
          subtexts.push(child);
          break;
        case Badge:
          badge = child;
          break;
        case Blurb:
          blurb = child;
          break;
        default:
          otherChildren.push(child);
          break;
      }
    }
  });

  return (
    <Card>
      <View style={styles.top}>
        {profilePic}
        <View style={styles.topTextContainer}>
          <View style={styles.nameRow}>
            <View style={[styles.nameAndBadge, !blurb && { flex: 1 }]}>
              {name}
              {badge}
            </View>
            {blurb}
          </View>
          {subtexts}
        </View>
      </View>
      {otherChildren}
    </Card>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  topTextContainer: {
    justifyContent: "center",
    paddingLeft: 12,
    flex: 1,
    gap: 6,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAndBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
});
