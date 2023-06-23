import { Select, Form, Input, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./Formpicelist.css";
import axios from "axios";
const Selectpricelist = () => {
  const [typecar, settypercar] = useState([]);
  const [typecarcode, settypecarcode] = useState("");
  const [brand, setbrand] = useState([]);
  const [model, setmodel] = useState([]);
  const [caryear, setcaryear] = useState([]);
  const [modeldetail, setmodeldetail] = useState([]);
  const [modelname, setmodelname] = useState("");
  const [price, setprice] = useState([]);
  const [caryears, setcaryears] = useState("");
  const [modelCode, setModecode] = useState("");
  const [persLeasing, setpersLeasing] = useState("");
  const [loadings, setLoadings] = useState([]);

  const [form] = Form.useForm();

  const fecthData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/typecar");
      settypercar(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangetypecar = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/brand?CAR_TYPE_CODE=${value}`
      );
      settypecarcode(value);
      setbrand(data.data.resultElements);
    } catch (err) {
      console.log(err);
    }
    // console.log(value);
  };
  const onChangebrand = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/brand?CAR_TYPE_CODE=${typecarcode}&&BN_CODE=${value}`
      );
      setmodel(data.data.resultElements2);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangemodel = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/year?MD_NAME=${value} `
      );
      setcaryear(data.data);
      setmodelname(value);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangecaryear = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/Model_detail?MD_NAME=${modelname}&&CAR_YEAR=${value} `
      );
      setmodeldetail(data.data);
      setcaryears(value);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangemodeldetail = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/price?MDDT_CODE=${value}&&CAR_YEAR=${caryears}`
      );
      setprice(data.data.arrTotal);
      //setpersLeasing(data.data);
      //console.log(data.data[0].PERS_LEASING);
      console.log(data.data.arrTotal);
      form.setFieldsValue({
        Select2: "",
        "exmple-price": data.data.arrTotal.PRICE,
        "manageable-amount": data.data.arrTotal.total,
      });
      console.log(form);
      console.log(data.data.arrTotal);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangeprice = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/persLeasing?MDDT_CODE=${value}&&CAR_YEAR=${caryears}`
      );
      setpersLeasing(data.data);
      console.log(data.data.PERS_LEASING);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);
  return (
    <div className="formPircelist">
      <Form form={form}>
        <Form.Item label="ประเภทรถ" name="type-car">
          <Select
            showSearch
            style={{ width: 277 }}
            placeholder="เลือกประเภทรถ"
            onChange={onChangetypecar}
          >
            {typecar.map((item, index) => (
              <Select.Option value={item.CAR_TYPE_CODE} key={index}>
                {item.CAR_TYPE_NAME}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div>
          <Form.Item label="ยี่ห้อ" name="brand">
            <Select
              showSearch
              style={{ width: 277 }}
              placeholder="เลือกยี่ห้อรถ"
              onChange={onChangebrand}
            >
              {brand.map((item, index) => (
                <Select.Option value={item.BN_CODE} key={index}>
                  {item.BN_NAME}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="รุ่นรถ" name="mode-car">
            <Select
              showSearch
              style={{ width: 277 }}
              placeholder="เลือกรุ่นรถ"
              onChange={onChangemodel}
            >
              {model.map((item, index) => (
                <Select.Option value={item.MD_NAME} key={index}>
                  {item.MD_NAME}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="ปีรถ(พ.ศ.)" name="year">
            <Select
              showSearch
              style={{ width: 277 }}
              placeholder="เลือกปีรถ"
              onChange={onChangecaryear}
            >
              {caryear.map((item, index) => (
                <Select.Option value={item.CAR_YEAR} key={index}>
                  {item.CAR_YEAR}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="โฉม" name="model-detail">
            <Select
              showSearch
              style={{ width: 277 }}
              placeholder="เลือกโฉมรถ"
              onChange={onChangemodeldetail}
            >
              {modeldetail.map((item, index) => (
                <Select.Option value={item.MDDT_CODE} key={index}>
                  {item.MDDT_NAME}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="ราคากลาง" name="exmple-price">
            <Input
              value={price.PRICE}
              onChange={onChangeprice}
              style={{ width: 277 }}
              suffix="บาท"
              disabled
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="ยอดที่จัดได้" name="manageable-amount">
            <Input
              value={price.total}
              style={{ width: 277 }}
              suffix="บาท"
              disabled
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="วงเงินที่ต้องการ" name="วงเงินที่ต้องการ">
            <Input style={{ width: 277 }} suffix="บาท" />
          </Form.Item>
        </div>

        <Form.Item label="ดอกเบี้ย" name="ดอกเบี้ย">
          <Select
            className="money"
            style={{ width: 150 }}
            placeholder="เลือกดอกเบี้ย"
            options={[
              { value: 20, label: "20", disabled: true },
              { value: 21, label: "21", disabled: true },
              { value: 22, label: "22", disabled: true },
              { value: 23, label: "23" },
              { value: 24, label: "24" },
            ]}
          ></Select>
        </Form.Item>

        <div>
          <Form.Item>
            <Button className="buttoncal" style={{ width: 180 }} type="primary">
              คำนวณ
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

function Selecterpricelist() {
  return <Selectpricelist />;
}
export default Selecterpricelist;
