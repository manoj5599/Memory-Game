import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default class Card extends React.Component {
  render() {
    let icon_name = "X";
    if (this.props.is_open) {
      icon_name = this.props.name;
    }

    return (
      <View style={styles.card}>
        <TouchableHighlight onPress={this.props.clickCard}>
          <Text
            style={icon_name == "X" ? styles.card_text : styles.card_text_match}
          >
            {icon_name}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
  },
  card_text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
  },
  card_text_match: {
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
  },
});
