import { StyleSheet, StatusBar } from "react-native";
import responsive from "@/components/reponsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212832",
    paddingHorizontal: responsive.normalizeX(26),
  },
  viewImage: {
    width: responsive.normalizeWidth(369),
    height: responsive.normalizeHeight(330),
    marginTop: responsive.normalizeY(34),
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
    height: responsive.normalizeHeight(194),
    marginTop: responsive.normalizeY(60),
  },
  text: {
    color: "#FFFFFF",
    lineHeight: 60,
  },
  letStartBox: {
    width: responsive.normalizeWidth(376),
    height: responsive.normalizeHeight(67),
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: responsive.normalizeY(59),
  },
});

export default styles;
