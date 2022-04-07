import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Turns extends React.Component {
  render() {
    return (
      <View style={styles.score_container}>
        <Text style={styles.title}>Turns</Text>
        <Text style={styles.turns}>{this.props.turns}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  turns_container: {
    flex: 1,
    alignItems: "center",
    //padding: 2,
  },
  turns: {
    fontSize: 40,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
