import React, { useState } from "react";
import { Steps, Panel, Placeholder, ButtonGroup, Button } from "rsuite";
import SupplyZain from "../Project one/SupplyZain";
import BaslineData from "../BaslineData/BaslineData";
import SalseForce from "../SalseFoces/SalseForce";


const Rounting = () => {
  const [step, setStep] = React.useState(0);
  const [isOrderCycleSubmit, setIsOrderCycleSubmit] = React.useState(false);
  const [newOrderCycleData, setNewOrderCycleData] = React.useState(false);

  const [isBaselineCompleted, setIsBaselineCompleted]=useState(false);

  const onChange = (nextStep: any) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const onRecordSubmitted = (isSubmitted: boolean, ocData: any) => {
    setNewOrderCycleData(ocData);
    setIsOrderCycleSubmit(isSubmitted);
  };

  const onBaselineCompleted = (isCompleted: boolean) => {
    setIsBaselineCompleted(isCompleted);
  };

  return (
    <div>
      <Steps current={step}>
        <Steps.Item title="Finished" description="Description" />
        <Steps.Item title="In Progress" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
      </Steps>
      <hr />
      <Panel header={`Step: ${step + 1}`}>
        {step === 0 ? (
          <SupplyZain onRecordSubmitted={onRecordSubmitted} />
        ) : step === 1 ? (
          <BaslineData
            ocData={newOrderCycleData}
            onBaselineCompleted={onBaselineCompleted}
          ></BaslineData>
        ) : step === 2 ? (
          <><SalseForce/></>
        ) : step === 3 ? (
          <>close</>
        ) : (
          ""
        )}
      </Panel>
      <hr />
      <center>
        <ButtonGroup>
          <Button onClick={onPrevious} disabled={step === 0}>
            Previous
          </Button>
          <Button
          
            onClick={onNext}
            disabled={step === 3 || (step === 1 && !isBaselineCompleted)|| !isOrderCycleSubmit}
          >
            Next
          </Button>
        </ButtonGroup>
      </center>
    </div>
  );
};

export default Rounting;
