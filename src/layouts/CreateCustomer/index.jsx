import React, { useReducer } from "react";
import { SingleDatePicker } from "react-dates";
import Error from "components/Error";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import swal from "sweetalert";
import { CUSTOMER_ALERT_MESSAGES } from "static/alertMessages";
import alertPredefinedActions from "static/alertPredefinedActions";

const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $mobileNo: Int!
    $customerName: String!
    $installationDate: String!
    $customerNo: String!
    $area: Int!
    $activeStatus: Boolean!
    $aadhaarNo: String!
  ) {
    insert_customers(
      objects: {
        phone_no: $mobileNo
        name: $customerName
        installation_date: $installationDate
        customer_no: $customerNo
        area_id: $area
        active: $activeStatus
        aadhaar_no: $aadhaarNo
      }
    ) {
      affected_rows
    }
  }
`;

const AREA_LIST = gql`
  {
    list: area(where: { active: { _eq: true } }) {
      name
      id
      areaCode: area_code
    }
  }
`;
const PLAN_LIST = gql`
  {
    list: plans(where: { active: { _eq: true } }) {
      name
      id
    }
  }
`;

const initialState = {
  area: "",
  customerNo: "",
  customerName: "",
  planId: "",
  installationDate: null,
  activeStatus: true,
  mobileNo: null,
  aadhaarNo: null,
};

const actionTypes = {
  UPDATE_VALUE: "UPDATE_VALUE",
  RESET_CUSTOMER: "RESET_CUSTOMER",
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_VALUE:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.RESET_CUSTOMER:
      return { ...initialState };
    default:
      throw new Error();
  }
}

const CreateCustomer = () => {
  const { loading: areaLoading, error: areaError, data: areaList } = useQuery(
    AREA_LIST
  );
  const { loading: planLoading, error: planError, data: planList } = useQuery(
    PLAN_LIST
  );

  const [hasSubscriptionActivated, setSubscriptionActivated] = useState(false);

  const [
    addCustomer,
    { loading: addCustomerLoading, error: addCustomerError, data },
  ] = useMutation(ADD_CUSTOMER, {
    onCompleted() {
      swal({
        title: "Customer",
        text: CUSTOMER_ALERT_MESSAGES.customerCreated,
        icon: alertPredefinedActions.success,
      }).then(() => {
        dispatch({
          type: actionTypes.RESET_CUSTOMER,
        });
      });
    },
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [focused, setFocused] = useState(false);
  if (areaLoading || planLoading) return <p>Loading...</p>;
  if (areaError || planError || addCustomerError) return <Error />;

  if (addCustomerLoading) {
    swal(<p>Loading...</p>);
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="border border-gray-400 p-4">
        <h4 className="text-gray-700">Create Customer</h4>
      </div>
      <div className="border border-gray-400 bg-purple-100 p-4">
        <label className="text-gray-700 my-4 block">Area </label>
        <select
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          value={state.area}
          onChange={(e) => {
            let areaData = areaList.list.find(
              (data) => data.id.toString() === e.target.value
            );
            dispatch({
              type: actionTypes.UPDATE_VALUE,
              payload: {
                area: Number(e.target.value),
                customerNo: areaData.areaCode,
              },
            });
          }}
        >
          <option value="">Select Area</option>
          {areaList.list.map((areaData) => {
            return (
              <option key={areaData.id} value={areaData.id}>
                {areaData.name}
              </option>
            );
          })}
        </select>
        <label className="text-gray-700 my-4 block">Customer no.</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="text"
          value={state.customerNo}
          onChange={(e) =>
            dispatch({
              type: actionTypes.UPDATE_VALUE,
              payload: { customerNo: e.target.value },
            })
          }
        />

        <label className="text-gray-700 my-4 block">Name</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="text"
          value={state.customerName}
          onChange={(e) =>
            dispatch({
              type: actionTypes.UPDATE_VALUE,
              payload: { customerName: e.target.value },
            })
          }
        />
        <label for="toggle" class="flex items-center cursor-pointer">
          <div class="relative">
            <input
              id="toggle"
              type="checkbox"
              class="hidden"
              onChange={() =>
                setSubscriptionActivated(!hasSubscriptionActivated)
              }
              checked={hasSubscriptionActivated}
            />
            <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
          </div>
          <div class="ml-3 text-gray-700 font-medium">
            Activate Subscription
          </div>
        </label>
        {hasSubscriptionActivated && (
          <>
            <label className="text-gray-700 my-4 block">Package Type</label>
            <select
              className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
              value={state.planId}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.UPDATE_VALUE,
                  payload: { planId: e.target.value },
                })
              }
            >
              <option value="">Select Package</option>
              {planList.list.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </>
        )}

        <label className="text-gray-700 my-4 block">Installation Date</label>
        <div className="installation-date-picker ">
          <SingleDatePicker
            date={state.installationDate}
            focused={focused}
            onFocusChange={({ focused }) => setFocused(focused)}
            onDateChange={(date) =>
              dispatch({
                type: actionTypes.UPDATE_VALUE,
                payload: { installationDate: date },
              })
            }
            id="installation-date"
          />
        </div>
        <label className="text-gray-700 my-4 block">Mobile No.</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="number"
          value={state.mobileNo}
          onChange={(e) =>
            dispatch({
              type: actionTypes.UPDATE_VALUE,
              payload: { mobileNo: e.target.value },
            })
          }
        />
        <label className="text-gray-700 my-4 block">Aadhaar No.</label>
        <input
          className="border border-gray-300 rounded my-4 block bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 br-2"
          type="number"
          value={state.aadhaarNo}
          onChange={(e) =>
            dispatch({
              type: actionTypes.UPDATE_VALUE,
              payload: { aadhaarNo: e.target.value },
            })
          }
        />
      </div>
      <div className="border border-gray-400 p-4 flex justify-end">
        <button
          className="text-gray-700 border border-gray-500 active:border-gray-700  rounded-md px-2 py-1"
          onClick={() =>
            dispatch({
              type: actionTypes.RESET_CUSTOMER,
            })
          }
        >
          cancel
        </button>
        <button
          className="bg-purple-500 active:bg-purple-800 text-white rounded-md px-2 py-1 ml-1"
          onClick={() =>
            addCustomer({
              variables: {
                ...state,
                installationDate: new Intl.DateTimeFormat("en-US").format(
                  state.installationDate
                ),
                planId: undefined,
              },
            })
          }
        >
          create customer
        </button>
      </div>
    </div>
  );
};

export default CreateCustomer;
