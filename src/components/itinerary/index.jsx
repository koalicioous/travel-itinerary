import { calculateDuration, formatDuration } from "@/utils/helpers";
import {
  Document,
  Page,
  View,
  Text,
  PDFDownloadLink,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

const chunkArray = (array, chunkSize = 2) => {
  const result = [];
  if (!array) return result;

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};

const Itinerary = ({ order }) => {
  const bookingReference = order?.flightDetail?.booking_reference;
  const segments = order?.routes
    .map((route) => route?.segments)
    .reduce((a, b) => a.concat(b), []);
  const pages = chunkArray(segments, 2);
  const passengers = order?.passengers;

  return (
    <Document>
      {pages.map((segments, index) => {
        return (
          <Page style={styles.body} key={index}>
            {index === 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    FLIGHT RESERVATION DOCUMENT
                  </Text>
                  <Text style={{ marginTop: 4, fontWeight: "bold" }}>
                    CONFIRMED
                  </Text>
                </View>
                <View
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                    }}
                  >
                    BOOKING REFERENCE
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 24,
                      textAlign: "right",
                    }}
                  >
                    {bookingReference}
                  </Text>
                </View>
              </View>
            )}

            {segments.map((segment, index) => {
              const totalDuration = formatDuration(
                calculateDuration(segment?.departing_at, segment?.arriving_at)
              );

              return (
                <View key={`segment-${index}`}>
                  <View
                    style={{
                      marginTop: 12,
                      border: "1px solid #d6d6d6",
                      padding: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      Departure:{" "}
                      {moment(segment?.departing_at).format("DD MMM YYYY")}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      Arrival:{" "}
                      {moment(segment?.arriving_at).format("DD MMM YYYY")}
                    </Text>
                  </View>
                  <View
                    style={{
                      border: "1px solid #d6d6d6",
                      borderTop: 0,
                      padding: 4,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      src={`https://content.airhex.com/content/logos/airlines_${segment?.marketing_carrier?.iata_code}_100_100_s.png`}
                      alt={segment?.marketing_carrier?.name}
                    />
                    <Text style={{ fontSize: 12, marginLeft: 8 }}>
                      {segment?.marketing_carrier.name}{" "}
                      {`${segment?.marketing_carrier?.iata_code}-${segment?.marketing_carrier_flight_number}`}{" "}
                      ({segment?.aircraft?.name})
                    </Text>
                  </View>
                  <View
                    style={{
                      border: "1px solid #d6d6d6",
                      borderTop: 0,
                      borderBottom: 0,
                      padding: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "40%" }}>
                      <Text style={{ fontSize: 10 }}>ORIGIN</Text>
                      <Text style={{ fontSize: 40 }}>
                        {segment?.origin?.iata_code}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        {segment?.origin?.name}
                      </Text>
                      <Text style={{ fontSize: 10, marginTop: 2 }}>
                        {segment?.origin?.city?.name ??
                          segment?.origin?.city_name ??
                          ""}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      — {totalDuration} —
                    </Text>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-end",
                        width: "40%",
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>DESTINATION</Text>
                      <Text style={{ fontSize: 40 }}>
                        {segment?.destination?.iata_code}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        {segment?.destination?.name}
                      </Text>
                      <Text style={{ fontSize: 10, marginTop: 2 }}>
                        {segment?.destination?.city?.name ??
                          segment?.destination?.city_name ??
                          ""}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      border: "1px solid #d6d6d6",
                      borderTop: 0,
                      padding: 8,
                      paddingTop: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {moment(segment?.departing_at).format("HH:mm")}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {moment(segment?.arriving_at).format("HH:mm")}
                    </Text>
                  </View>
                  <View
                    style={{
                      border: "1px solid #d6d6d6",
                      borderTop: 0,
                      padding: 0,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ width: "50%", borderRight: "1px solid #d6d6d6" }}
                    >
                      <View style={{ padding: 8 }}>
                        <Text style={{ fontSize: 12 }}>STATUS: CONFIRMED</Text>
                      </View>
                    </View>
                    <View style={{ width: "50%" }}>
                      <View style={{ padding: 8 }}>
                        <Text style={{ fontSize: 12 }}>
                          CLASS:{" "}
                          {segment?.passengers?.[0]?.cabin_class_marketing_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        marginTop: 0,
                        border: "1px solid #d6d6d6",
                        borderTop: 0,
                        padding: 8,
                      }}
                    >
                      <Text style={{ fontSize: 14, marginBottom: 10 }}>
                        PASSENGERS:
                      </Text>
                      {passengers.map((passenger, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 2,
                            }}
                            key={passenger?.id}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                marginBottom: 4,
                                width: "60%",
                              }}
                            >
                              {`${index + 1}. ${passenger?.title} ${
                                passenger?.firstName
                              } ${passenger?.lastName}`}
                            </Text>
                            <Text
                              style={{
                                fontSize: 8,
                                marginBottom: 4,
                                width: "20%",
                              }}
                            >
                              (Checkin Required)
                            </Text>
                            <Text
                              style={{
                                fontSize: 8,
                                marginBottom: 4,
                                width: "20%",
                              }}
                            >
                              {segment?.passengers?.[0]?.baggages?.[0]
                                ?.quantity ?? 1}{" "}
                              Checked Baggage
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        );
      })}
    </Document>
  );
};

const DownloadButton = (props) => {
  const { order } = props;
  return (
    <PDFDownloadLink
      document={<Itinerary order={order} />}
      fileName={`Reservation-${order?.flightDetail?.id}.pdf`}
      className="p-2 px-4 bg-gray-800 text-white mx-auto rounded-md mt-5"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download Reservation"
      }
    </PDFDownloadLink>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default DownloadButton;
