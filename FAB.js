import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const FAB = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const infoText = `PLAYOFF FORMAT\n\nThe Basics\n16 teams will qualify for the Stanley Cup Playoffs.\nThe format is a set bracket that is largely division-based with wild cards.\nThe top three teams in each division will make up the first 12 teams in the playoffs.\nThe remaining four spots will be filled by the next two highest-placed finishers in each conference, based on regular-season record and regardless of division.\nIt is possible for one division in each conference to send five teams to the postseason while the other sends just three.\nHome-ice advantage through the first two rounds goes to the team that placed higher in the regular-season standings.\nEach of the four rounds is a best-of-7; the first team to win four games advances to the next round.\n\nThe First Round\nThe division winner with the best record in each conference will be matched against the wild-card team with the lesser record\nThe wild card team with the better record will play the other division winner.\nThe teams finishing second and third in each division will meet within the bracket headed by their respective division winners.\n\nThe Second Round\nFirst-round winners within each bracket play one another to determine the four participants in the Conference Finals.\n\nConference Finals & Stanley Cup Final\nIn the Conference Finals and Stanley Cup Final, home-ice advantage goes to the team that had the better regular-season record - regardless of the teams' final standing in their respective divisions.`;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{infoText}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>i</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default FAB;
