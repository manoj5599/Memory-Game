import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "./components/Header";
import Score from "./components/Score";
import Card from "./components/Card";

import Turns from "./components/Turns";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: [],
      number_of_turns: 0,
    };
  }

  componentDidMount() {
    this.createCards();
  }
  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  createCards() {
    let cards = [
      {
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      {
        name: "D",
      },
      {
        name: "E",
      },
      {
        name: "F",
      },
      {
        name: "G",
      },
      {
        name: "H",
      },
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    cards = cards.concat(clone);
    cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.is_open = false;
    });
    cards = this.shuffleArray(cards);
    this.setState({
      cards: cards,
    });
  }
  resetCards() {
    let cards = this.state.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = this.shuffleArray(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
      number_of_turns: 0,
    });
  }
  getRowContents(cards) {
    let contents_of_row = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if (count == 4) {
        contents_of_row.push(contents);
        count = 0;
        contents = [];
      }
    });
    return contents_of_row;
  }

  renderRows() {
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          {this.renderCards(cards)}
        </View>
      );
    });
  }
  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if (
      cards[index].is_open == false &&
      selected_pairs.indexOf(cards[index].name) === -1
    ) {
      cards[index].is_open = true;

      current_selection.push({
        index: index,
        name: cards[index].name,
      });

      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) {
          score += 1;
          selected_pairs.push(cards[index].name);
        } else {
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards,
              number_of_turns: this.state.number_of_turns + 1,
            });
          }, 300);
        }

        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection,
      });
    }
  }
  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          name={card.name}
          is_open={card.is_open}
          clickCard={() => this.clickCard(card.id)}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ borderRadius: 9, marginTop: "4%", marginLeft: "4%" }}>
            <Turns turns={this.state.number_of_turns} />
          </View>
          <View style={{ justifyContent: "center", padding: "1%" }}>
            <Score score={this.state.score} />
          </View>
        </View>
        <View style={styles.body}>{this.renderRows()}</View>
        <View style={styles.button}>
          <Button
            onPress={() => this.resetCards()}
            title="Restart"
            color="purple"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  body: {
    flex: 18,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20,
  },
  button: {
    alignSelf: "center",
    marginBottom: "3%",
    borderRadius: 7,

    //padding: 6,
  },
});
