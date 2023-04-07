import { Radio, DatePicker, Select } from "antd";
import axios from "@/services/axios";
import { useState } from "react";
import { debounce } from "lodash";

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
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const handleSearchOrigin = async (query) => {
    if (!query) return;
    setLoading(true);
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchDestionation = async (query) => {
    if (!query) return;
    setLoading(true);
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Flight Type</div>
        <div>
          <Radio.Group
            options={flightOptions}
            optionType="button"
            style={{ width: "100%" }}
            size="large"
            onChange={(e) => setFlightType(e.target.value)}
            defaultValue={flightType}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Origin</div>
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
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Destination</div>
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
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Departure Date</div>
        <DatePicker
          size="large"
          style={{
            width: "100%",
          }}
          placeholder="Departure Date"
          format={"DD MMMM YYYY"}
        />
      </div>
      {flightType === "round-trip" && (
        <div className="mb-4">
          <div className="mb-2 font-semibold">Return Date</div>
          <DatePicker
            size="large"
            style={{
              width: "100%",
            }}
            placeholder="Return Date"
            format={"DD MMMM YYYY"}
          />
        </div>
      )}
    </div>
  );
};

export default ChooseFlight;
