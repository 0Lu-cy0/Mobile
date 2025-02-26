import { StyleSheet, StatusBar } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212832",
  },
  letStartBox: {
    width: responsive.normalizeWidth(376),
    height: responsive.normalizeHeight(67),
    paddingHorizontal: 40,
    paddingVertical: 15,
    position: "absolute",
    left: responsive.normalizeX(26),
    top: responsive.normalizeY(809),
  },
  viewImage: {
    width: responsive.normalizeWidth(369),
    height: responsive.normalizeHeight(330),
    position: "absolute",
    left: responsive.normalizeX(26),
    top: responsive.normalizeY(123),
    backgroundColor: "white",
  },
  image: {
    width: responsive.normalizeWidth(321.01),
    height: responsive.normalizeHeight(320.17),
    justifyContent: "center",
    alignItems: "center",
  },
  viewText: {
    width: responsive.normalizeWidth(275),
    height: responsive.normalizeHeight(240),
    justifyContent: "center",
    alignItems: "center",
    left: responsive.normalizeX(0),
    top: responsive.normalizeY(505),
  },
  text: {
    color: "#FFFFFF",
    fontSize: responsive.normalizeFontSize(60),

  },
});

export default styles;
