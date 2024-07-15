import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "rsuite";

interface baslineUser {
  OwenerName: string;
  OwenerRole: string;
  SubmissionStatus: string;
  DueDate: Date;
  SubmissionDate: any;
  Submittedby: string;
  Remainingdays: number;
  id: Number;
}

const BaslineData = (props: {
  onBaselineCompleted(allcompilted: boolean): unknown;
  ocData: any;
}) => {
  const [baslineUser, setBaslineUser] = useState<baslineUser[]>([]);

  const formateDate = (dt: Date) => {
    return (
      dt.getDate() + "-" + padName(dt.getMonth() + 1) + "-" + dt.getFullYear()
    );
  };

  const padName = (value: number) => {
    // console.log("value", value);
    return value < 10 ? "0" + value : value;
  };

  useEffect(() => {
    fetch("/DataBase/BaselineUsers.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then((businessUser) => {
        let buItem = businessUser.data.filter(
          (bItem: any) => bItem.BusniessUnit === props.ocData.selectUnit.trim()
        );
        if (buItem.length) {
          let temBaseLineUser: any = [];

          buItem[0].BaslineUsers.forEach((element: any, index: any) => {
            let baslineUser: baslineUser = {
              OwenerName: element.Owner,
              OwenerRole: element.Role,

              SubmissionStatus: "padding",
              DueDate: getBaseLineDueDate(),

              Submittedby: "",
              Remainingdays: 2,
              SubmissionDate: null,
              id: index,
            };
            temBaseLineUser.push(baslineUser);
          });

          setBaslineUser(temBaseLineUser);
        }

        //console.log(businessUser);
      });
  }, []);

  const getBaseLineDueDate = () => {
    var dt = new Date();
    dt.setDate(dt.getDate() + 2);
    return dt;
  };

  const onBaseLineSubmit = (buser: baslineUser) => {
    console.log(buser);
    buser.Submittedby = "sachin sir";
    buser.SubmissionDate = formateDate(new Date());
    buser.SubmissionStatus = "Completed";

    // let  allcompilted:boolean=true;
    // baslineUser.forEach((item:baslineUser)=>{

    //   if(item.SubmissionStatus){

    //     allcompilted=false

    //   }

    // })
    // if(allcompilted){
    //   props.onBaselineCompleted(allcompilted)

    //  }

    let pendingBUsers = baslineUser.filter(
      (item) => item.SubmissionStatus === "Pending"
    );
    if (pendingBUsers.length === 0) {
      props.onBaselineCompleted(true);
    }

    setBaslineUser((prevBaselineUsers) => {
      // Make a copy of the previous state array to avoid mutating it
      const newBaselineUsers = [...prevBaselineUsers];
      // Find the index of the user to update
      const index = newBaselineUsers.findIndex(
        (user: any) => user.id === user.id
      );
      if (index >= 0) {
        // If the user exists in the array, replace it with the updated user object
        newBaselineUsers.splice(index, 1, buser);
      } else {
        // Otherwise, add the new user object to the end of the array
        newBaselineUsers.push(buser);
      }
      // Return the updated array as the new state
      return newBaselineUsers;
    });
  };

  const { ocData } = props;
  return (
    <>
      <div>
        <Container
          style={{
            backgroundColor: "#f2f2f2",
            border: "1px solid #E8E8E8",
            padding: "40px 10px 40px 10px",
            borderRadius: "10px",
          }}
        >
          <Row>
            <Col as={Col} xs={12} md={1}>
              <span>Title :</span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label>{ocData.ocTitle}</label>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <span>Company : </span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label style={{ color: "black" }}>
                {props.ocData.selectComapny}
              </label>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <span>Business Unit :</span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label>{props.ocData.selectUnit}</label>
            </Col>
          </Row>
          <br />
          <Row>
            <Col as={Col} xs={12} md={1}>
              <span>Country </span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label>{props.ocData.selectCountry}</label>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <span>Start Date :</span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label>
                {formateDate(new Date(props.ocData.selectedStartDate))}
              </label>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <span>End Date :</span>
            </Col>
            <Col as={Col} xs={12} md={3}>
              <label>
                {formateDate(new Date(props.ocData.selectedEndDate))}
              </label>
            </Col>
          </Row>
        </Container>

        <br />

        <Container
          style={{
            backgroundColor: "#f2f2f2",
            border: "1px solid #E8E8E8",
            padding: "5px 0px 5px 10px",
            borderRadius: "10px",
          }}
        >
          <Row>
            <Col as={Col} xs={12} md={2}>
              <p>Owener Name</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p> Owner Role</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p> Template Link</p>
            </Col>
            <Col as={Col} xs={12} md={2}>
              <p> Submission Status</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p>Due Date</p>
            </Col>
            <Col as={Col} xs={12} md={2}>
              <p> Submission Date</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p>Submitted by</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p>Remaining days</p>
            </Col>
            <Col as={Col} xs={12} md={1}>
              <p>Action</p>
            </Col>
          </Row>
          <Row>
            {baslineUser.map((buser: any) => {
              return (
                <>
                  <div className="container">
                    <Row>
                      <Col as={Col} xs={12} md={2}>
                        <p>{buser.OwenerName}</p>
                      </Col>
                      <Col as={Col} xs={12} md={1}>
                        <p>{buser.OwenerRole}</p>
                      </Col>
                      <Col as={Col} xs={12} md={1}>
                        <p>{}</p>
                      </Col>

                      <Col as={Col} xs={12} md={1}>
                        <p>{buser.SubmissionStatus}</p>
                      </Col>
                      <Col as={Col} xs={12} md={1}>
                        <p>{}</p>
                      </Col>
                      <Col as={Col} xs={12} md={2}>
                        <p>{formateDate(buser.DueDate)}</p>
                      </Col>
                      <Col as={Col} xs={12} md={1}>
                        <p>{buser.SubmissionDate}</p>
                      </Col>

                      <Col as={Col} xs={12} md={1}>
                        <p>{buser.Submittedby}</p>
                      </Col>
                      <Col as={Col} xs={12} md={1}>
                        <p>{buser.Remainingdays}</p>
                      </Col>

                      <Col as={Col} xs={12} md={1}>
                        <p>
                          <Button
                            style={{ background: "green", color: "yellow" }}
                            onClick={() => {
                              onBaseLineSubmit(buser);
                            }}
                            disabled={buser.submissionStatus === "Completed"}
                          >
                            Submit
                          </Button>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default BaslineData;
