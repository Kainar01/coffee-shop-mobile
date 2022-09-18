import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { QR_CODE_PREFIX } from "constants/qr";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BarCodeMask from "react-native-barcode-mask";

type Props = {
  onScanned: (data: string) => void
}
const QrCodeScanner = ({ onScanned }: Props) => {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState<null | boolean>(false);
  const camera = useRef<Camera | null>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("requested permission", status);
      setHasPermission(status === "granted");
    })();
    return () => {
      setScanned(false); // does not work on navigate
    };
  }, []);

  useFocusEffect(() => {
    setScanned(false); // resets scan when navigate back
  });

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    if (data.startsWith(QR_CODE_PREFIX)) {
      onScanned(data.replace(QR_CODE_PREFIX, ''))
      setScanned(true)
    }
  };

  if (hasPermission === null) {
    return <Text style={{ textAlign: 'center' }}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{ textAlign: 'center' }}>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
      }}
    >
      {isFocused ? (
        <Camera
          ref={(cam) => (camera.current = cam)}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
          style={[StyleSheet.absoluteFillObject, styles.qrContainer]}
        >
          <Text style={styles.qrText}>Сканируйте QR-код</Text>
          <BarCodeMask
            showAnimatedLine={false}
            edgeRadius={10}
            edgeColor={'white'}
            width={290}
            height={290}
            outerMaskOpacity={0.3}
            edgeBorderWidth={8}
            edgeHeight={50}
            edgeWidth={50}
          ></BarCodeMask>
        </Camera>
      ) : null}
    </View>
  );
};

export default QrCodeScanner;

const styles = StyleSheet.create({
  qrContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  qrText: {
    color: "white",
    fontSize: 18,
    position: "absolute",
    top: 70,
  },
});