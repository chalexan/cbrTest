import { getDataToDate, getData10days } from "../../api/cbrData";
import { useEffect, useState } from "react";
import moment from "moment";
import { Table, Card, Tooltip, Modal } from "antd";

const CurrViewer = () => {
  const [currencyNow, setCurrencyNow] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [datesValues, setDatesValues] = useState([]);
  const [currentValute, setCurrentValute] = useState("No_Valute_Changed");

  useEffect(() => {
    const getCurrencyNow = async () =>
      setCurrencyNow(await getDataToDate(moment().format("YYYY/MM/DD")));
    getCurrencyNow();
  }, []);

  const columns = [
    {
      title: "Код валюты",
      dataIndex: "CharCode",
      key: "0",

      render: (_, record) => (
        <Tooltip placement="topLeft" title={record.Name}>
          {record.CharCode}
        </Tooltip>
      ),
    },
    {
      title: "Значение в рубляx",
      dataIndex: "Value",
      key: "1",
    },
    {
      title: "Разница в процентах",
      key: "2",
      render: (_, record) =>
        record.Value > record.Previous ? (
          <b>
            {(100 - (record.Previous / record.Value) * 100).toFixed(2)} %
            <font color="green"> ▲</font>
          </b>
        ) : (
          <b>
            {(100 - (record.Value / record.Previous) * 100).toFixed(2)} %
            <font color="red"> ▼</font>
          </b>
        ),
    },
  ];

  return (
    <Card
      headStyle={{ backgroundColor: "#c0ede4", border: 1 }}
      title="Курсы валют к рублю"
      bordered={true}
      style={{ width: "75%", margin: "10px" }}
    >
      <Modal
        title={currentValute}
        visible={isModalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {datesValues &&
          datesValues.map((el) => (
            <p>
              <b>{el.date_} </b>: {el.value}
            </p>
          ))}
      </Modal>

      {currencyNow && (
        <Table
          dataSource={currencyNow}
          columns={columns}
          onRow={(record, _) => {
            return {
              onClick: async () => {
                setModalVisible(true);
                setCurrentValute(record.CharCode);
                return setDatesValues(
                  await getData10days(
                    moment().format("YYYY/MM/DD"),
                    record.CharCode
                  )
                );
              },
            };
          }}
        />
      )}
    </Card>
  );
};

export default CurrViewer;
