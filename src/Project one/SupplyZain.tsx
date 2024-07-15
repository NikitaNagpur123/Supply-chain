import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, ButtonGroup, Container } from "react-bootstrap";

import "rsuite/dist/rsuite.min.css";
import React from "react";

interface SupplyZainProps {
  onRecordSubmitted: any;
}

interface SupplyZainState {
  companyItem: Array<any>;
  businessUnit: Array<any>;
  companyMaster: Array<any>;
  selectComapny: any;
  selectUnit: any;
  selectCountry: any;
  cammand: string;
  isFormValid: boolean;
  selectedStartDate: Date;
  selectedEndDate: Date;
  ocTitle: string;
}

let arrayMoth: string[] = [
  "jan",
  "feb",
  "march",
  "April",
  "may",
  "jun",
  "july",
  "Aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export default class SupplyZain extends React.Component<
  SupplyZainProps,
  SupplyZainState
> {
  constructor(props: SupplyZainProps) {
    super(props);
    this.state = {
      companyItem: [],
      businessUnit: [],
      companyMaster: [],
      selectComapny: "",
      selectUnit: "",
      cammand: "",
      selectCountry: "",
      isFormValid: true,
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
      ocTitle: "",
    };
  }

  // comapnyItem featch
  componentDidMount(): void {
    fetch("/DataBase/CompanyMaster.json")
      .then((response) => {
        return response.json();
      })
      .then((companyData) => {
        this.setState({
          companyItem: companyData.data,
        });
      })
      .catch((error) => console.error(error));

    // BuusnessUnit fetch
    fetch("/DataBase/BusniessUnit.json")
      .then((response) => {
        return response.json();
      })
      .then((companyUnit) => {
        this.setState({
          businessUnit: companyUnit.data,
        });
      })
      .catch((error) => console.error(error));

    //campany Master fteach
    fetch("/DataBase/countryItem.json")
      .then((response) => {
        return response.json();
      })
      .then((companyMaster) => {
        this.setState({
          companyMaster: companyMaster.data,
        });
      })
      .catch((error) => console.error(error));
  }

  createNewOrderCycleTitle = () => {
    let dt = new Date();

    let template = ` ${this.state.selectComapny}-${this.state.selectUnit}-${
      this.state.selectCountry
    }-${arrayMoth[dt.getMonth()]}-${dt.getDate()}-${dt.getFullYear()}`;
    this.setState({
      ocTitle: template,
    });
  };

  onChangeComanyMaster = (event: any) => {
    this.setState(
      {
        selectComapny: event.target.value,
      },
      () => {
        this.createNewOrderCycleTitle();
      }
    );
  };
  onChangeCompanyUnit = (event: any) => {
    this.setState(
      {
        selectUnit: event.target.value,
      },
      () => {
        this.createNewOrderCycleTitle();
      }
    );
  };

  onChangeStartDate = (eve: any) => {
    this.setState({
      selectedStartDate: eve.target.value,
    });
  };

  onChangeEndDate = (eve: any) => {
    this.setState({
      selectedEndDate: eve.target.value,
    });
  };
  onchangCuntery = (eve: any) => {
    this.setState({
      selectCountry: eve.target.value,
    });
  };

  formateDate = (dt: Date) => {
    return (
      dt.getFullYear() +
      "-" +
      this.padName(dt.getMonth() + 1) +
      "-" +
      dt.getDate()
    );
  };

  padName = (value: number) => {
    // console.log("value", value);
    return value < 10 ? "0" + value : value;
  };

  CreatNewOrderCycle = () => {
    if (this.isFormValid()) {
      this.props.onRecordSubmitted(true, this.state);
    } else {
      this.setState({
        isFormValid: false,
      });
    }
  };

  isFormValid = () => {
    if (
      this.state.selectComapny === "" ||
      this.state.selectUnit === "" ||
      this.state.selectCountry === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  render(): React.ReactNode {
    return (
      <>
        <Container style={{ padding: "0px" }}>
          <div style={{ textAlign: "left" }}>
            <Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ fontWeight: "500" }}>Title</Form.Label>
                <Form.Control
                  disabled={true}
                  type="text"
                  placeholder="Enter Title"
                  value={this.state.ocTitle}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Company *
                </Form.Label>
                <Form.Select onChange={this.onChangeComanyMaster}>
                  <option value="">Select</option>
                  {this.state.companyItem.map((item) => {
                    return <option value={item.title}>{item.title}</option>;
                  })}
                </Form.Select>
                {!this.state.isFormValid && this.state.selectComapny === "" && (
                  <label style={{ color: "red" }}> Company is required</label>
                )}
              </Form.Group>
            </Row>

            <br></br>
            <Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Business Unit *
                </Form.Label>
                <Form.Select onChange={this.onChangeCompanyUnit}>
                  <option value={""}>Select</option>

                  {this.state.businessUnit.map((item) => {
                    return <option value={item.title}>{item.title}</option>;
                  })}
                </Form.Select>
                {!this.state.isFormValid && this.state.selectCountry === "" && (
                  <label style={{ color: "red" }}>
                    {" "}
                    Business Unit is required
                  </label>
                )}
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Country *
                </Form.Label>
                <Form.Select onChange={this.onchangCuntery}>
                  <option value={""}> Select</option>
                  {this.state.companyMaster.map((item) => {
                    return <option value={item.title}>{item.title}</option>;
                  })}
                </Form.Select>
                {!this.state.isFormValid && this.state.selectCountry === "" && (
                  <label style={{ color: "red" }}> Country is required</label>
                )}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Start Date *
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select Date"
                  value={this.formateDate(
                    new Date(this.state.selectedStartDate)
                  )}
                  onChange={this.onChangeStartDate}
                ></Form.Control>
                {new Date(this.state.selectedStartDate) >
                new Date(this.state.selectedEndDate) ? (
                  <label>
                    Expeact End Date Must Be Greater then Start Date
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Expected End Date *
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select Date"
                  onChange={this.onChangeEndDate}
                  value={this.formateDate(new Date(this.state.selectedEndDate))}
                ></Form.Control>
                {new Date(this.state.selectedStartDate) >
                new Date(this.state.selectedEndDate) ? (
                  <label>
                    Expeact End Date Must Be Greater then Start Date
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>
            </Row>
            <br></br>
            <Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label style={{ color: "Brown", fontWeight: "500" }}>
                  Comments
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={{ height: "80px", textAlign: "left" }}
                  placeholder="Enter Short Bio / Description"
                  onChange={(ev: any) =>
                    this.setState({ cammand: ev.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Row>

            <br></br>
            <Row>
              <Form.Group as={Col} xs={12} md={4}>
                <Button
                  variant="danger"
                  style={{ borderRadius: "20px" }}
                  onClick={this.CreatNewOrderCycle}
                >
                  Submit
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "25px", borderRadius: "20px" }}
                >
                  Do To Home
                </Button>
              </Form.Group>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
