import { Radio, DatePicker, Select, Form } from "antd";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useOrderForm } from "@/context";
import moment from "moment";
import { toast } from "react-hot-toast";

const flightOptions = [
  {
    value: "one-way",
    label: "One Way",
  },
  {
    value: "round-trip",
    label: "Round Trip",
  },
];

const ChooseFlight = () => {
  const [flightType, setFlightType] = useState("one-way");
  const [loading, setLoading] = useState(false);

  const {
    form,
    originOptions,
    setOriginOptions,
    destinationOptions,
    setDestinationOptions,
  } = useOrderForm();

  const departureDate = Form.useWatch("departureDate", {
    form,
    preserve: true,
  });

  const handleSearchOrigin = async (query) => {
    if (!query) return;
    setLoading(true);
    const searching = new Promise(async (resolve, reject) => {
      await axios
        .get("/place", {
          params: {
            q: query,
          },
        })
        .then((res) => {
          const { data } = JSON.parse(res.data);
          const options = data.map((item) => ({
            value: item.id,
            label: `${item.iata_code} - ${item.name} ${
              item.city_name ? `(${item.city_name})` : ""
            }`,
            ...item,
          }));
          setOriginOptions(options);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        })
        .finally(() => {
          setLoading(false);
        });
    });
    toast.promise(
      searching,
      {
        loading: "Searching airport..",
        success: "Search complete!",
        error: "Sorry, search failed :(",
      },
      {
        success: {
          duration: 100,
        },
      }
    );
  };

  const handleSearchDestionation = async (query) => {
    if (!query) return;
    setLoading(true);
    const searching = new Promise(async (resolve, reject) => {
      await axios
        .get("/place", {
          params: {
            q: query,
          },
        })
        .then((res) => {
          const { data } = JSON.parse(res.data);
          const options = data.map((item) => ({
            value: item.id,
            label: `${item.iata_code} - ${item.name} ${
              item.city_name ? `(${item.city_name})` : ""
            }`,
            ...item,
          }));
          setDestinationOptions(options);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        })
        .finally(() => {
          setLoading(false);
        });
    });
    toast.promise(
      searching,
      {
        loading: "Searching airport..",
        success: "Search complete!",
        error: "Sorry, search failed :(",
      },
      {
        success: {
          duration: 100,
        },
      }
    );
  };

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Flight Type</div>
        <div>
          <Form.Item
            name="flightType"
            style={{
              marginBottom: "0px",
            }}
            rules={[
              {
                required: true,
                message: "Please select flight type",
              },
            ]}
          >
            <Radio.Group
              options={flightOptions}
              optionType="button"
              style={{ width: "100%" }}
              size="large"
              onChange={(e) => {
                setFlightType(e.target.value);
                form.setFieldValue("returnDate", null);
              }}
              defaultValue={flightType}
            />
          </Form.Item>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Origin</div>
        <Form.Item
          name="flightOrigin"
          style={{
            marginBottom: "0px",
          }}
          rules={[
            {
              required: true,
              message: "Please select origin",
            },
          ]}
        >
          <Select
            style={{
              width: "100%",
            }}
            loading={loading}
            options={originOptions}
            size="large"
            placeholder="Origin"
            onSearch={debounce(handleSearchOrigin, 500)}
            showSearch
            filterOption={false}
          />
        </Form.Item>
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Destination</div>
        <Form.Item
          name="flightDestination"
          style={{
            marginBottom: "0px",
          }}
          rules={[
            {
              required: true,
              message: "Please select destination",
            },
          ]}
        >
          <Select
            style={{
              width: "100%",
            }}
            size="large"
            placeholder="Destination"
            showSearch
            filterOption={false}
            options={destinationOptions}
            onSearch={debounce(handleSearchDestionation, 500)}
            loading={loading}
          />
        </Form.Item>
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Departure Date</div>
        <Form.Item
          name="departureDate"
          style={{
            marginBottom: "0px",
          }}
          rules={[
            {
              required: true,
              message: "Please select departure date",
            },
          ]}
        >
          <DatePicker
            size="large"
            style={{
              width: "100%",
            }}
            placeholder="Departure Date"
            format={"DD MMMM YYYY"}
            onChange={() => {
              if (flightType === "round-trip") {
                form.setFieldValue("returnDate", null);
              }
            }}
            disabledDate={(current) => {
              return current && current < moment().startOf("day");
            }}
          />
        </Form.Item>
      </div>
      {flightType === "round-trip" && (
        <div className="mb-4">
          <div className="mb-2 font-semibold">Return Date</div>
          <Form.Item
            name="returnDate"
            style={{
              marginBottom: "0px",
            }}
            rules={[
              {
                required: true,
                message: "Please select return date",
              },
            ]}
          >
            <DatePicker
              size="large"
              style={{
                width: "100%",
              }}
              placeholder="Return Date"
              format={"DD MMMM YYYY"}
              {...(departureDate && {
                disabledDate: (current) => {
                  return current && current < departureDate.startOf("day");
                },
              })}
            />
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default ChooseFlight;
