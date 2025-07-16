const FlexboxTest = () => {
  return (
    <View
      style={{
        padding: 50,
        width: "80%",
        margin: "0px auto",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // height: 300,
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          // width: 100,
          flex: "auto",
          width: 30,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: "blue",
          // width: 100,
          // height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: "green",
          // width: 100,
          // height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>3</Text>
      </View>
    </View>
  );
};

export default FlexboxTest;
