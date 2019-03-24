import React from "react";
import {
  StyleSheet,
  TimePickerAndroid,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import moment from "moment";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      momentStart: moment({ hour: "4", minute: "0" }),
      momentEnd: moment({ hour: "12", minute: "0" }),
      chosenStartTime: "04:00",
      chosenEndTime: "12:00",
      intervalMinute: '0',
      intervalHour: '0',
      intervalSecond: '0'
    };
  }
  setStartTime = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = minute < 10 ? `0${minute}` : minute;
        const h = hour < 10 ? `0${hour}` : hour;
        if (moment({ hour, minute }).isBefore(this.state.momentEnd)) {
          this.setState({
            chosenStartTime: `${h}:${m}`,
            momentStart: moment({ hour, minute })
          });
        } else {
          Alert.alert("Time less");
        }
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };
  setEndTime = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = minute < 10 ? `0${minute}` : minute;
        const h = hour < 10 ? `0${hour}` : hour;
        if (moment({ hour, minute }).isAfter(this.state.momentStart)) {
          this.setState({
            chosenEndTime: `${h}:${m}`,
            momentEnd: moment({ hour, minute })
          });
        } else {
          Alert.alert("Time great");
        }
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };
  startIntervalAlert() {
    const intervalTime = 1000 * this.state.intervalSecond + 60000*this.state.intervalMinute +3600000*this.state.intervalHour;
    const km = setInterval(() => {
      if (moment().isSameOrAfter(this.state.momentEnd)) {
        console.log("Hi over");
        clearInterval(km);
      } else {

      }
      
    }, intervalTime);
  }
  setIntervalHour(text) {
    const pat = new RegExp(/^[0-9]*$/g);
    if(pat.test(text))
      this.setState({ intervalHour: text })
    
  }
  setIntervalMinute(text) {
    const pat = new RegExp(/^[0-9]*$/g);
    if(pat.test(text))
    this.setState({ intervalMinute: text })
  }
  setIntervalSecond(text) {
    const pat = new RegExp(/^[0-9]*$/g);
    if(pat.test(text))
    this.setState({ intervalSecond: text })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setStartTime()}>
          <View>
            <Text>Start Time</Text>
            <Text style={{ fontSize: 16 }}>{this.state.chosenStartTime}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setEndTime()}>
          <View>
            <Text>End Time</Text>
            <Text style={{ fontSize: 16 }}>{this.state.chosenEndTime}</Text>
          </View>
        </TouchableOpacity>
        <Text>Hour: </Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 1, paddingTop: 10 }}
          onChangeText={text => this.setIntervalHour(text)}
          value={this.state.intervalHour}
        />
        <Text>Minute: </Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 1, paddingTop: 10 }}
          onChangeText={text => this.setIntervalMinute(text)}
          value={this.state.intervalMinute}
        />
        <Text>Second: </Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 1, paddingTop: 10 }}
          onChangeText={text => this.setIntervalSecond(text)}
          value={this.state.intervalSecond}
        />
        <TouchableOpacity onPress={() => this.startIntervalAlert()}>
          <View>
            <Text> START ALARM</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
